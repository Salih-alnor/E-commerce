const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const {
  signupSchemaValidator,
  loginSchemaValidator,
} = require("../validators/authValidator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
/*
  @desc register a user
  @route POST /api/auth/signup
  @access Public
*/
const signup = asyncHandler(async (req, res, next) => {
  const { user_name, email, password, phone, role } = req.body;

  // 1- validate request body
  const { error } = signupSchemaValidator.validate(req.body);
  if (error) {
    const err = new Error(error.details[0].message);
    next(err);
    return;
  }

  // 2- check if user already exist
  const user = await User.findOne({ email });
  if (user) {
    const err = new Error("This email is already registered");
    next(err);
    return;
  }

  // - hash password before saving it to the database
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 3- create new user
  const newUser = await User.create({
    name: user_name,
    email,
    password: hashedPassword,
    phone,
    role,
  });

  // 4- create token
  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY);

  // 5- send user and token to client side
  res.status(201).json({status: "success", message: "Registerd Successfully!", user: newUser, token });
});

/*
  @desc Login user
  @route POST /api/auth/login
  @access Public
*/
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // 1- validate request body
  const { error } = loginSchemaValidator.validate(req.body.data);
  if (error) {
    const err = new Error(error.details[0].message);
    err.code = 400;
    next(err);
    return;
  }

  // 2- check if user is exist and password is valid
  const user = await User.findOne({ email });

  if (!user) {
    const err = new Error("Invalid email or password");
    err.code = 401;
    return next(err);
  }

  const hashedPassword = await bcrypt.compare(password, user.password);

  if (!hashedPassword) {
    const err = new Error("Invalid email or password");
    err.code = 401;
    return next(err);
  }

  // 3- create token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

  // 4- send user and token to client side
  res.status(200).json({ status: "success", message: "Logind Successfully!", user, token });
});

const auth = asyncHandler(async (req, res, next) => {

  let token;
  // 1- check if token is exist
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

 
  if (!token) {
    const error = new Error("Your not authorized to access this page");
    next(error);
    return;
  }

  // 2- check if token is valid
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  if (!decoded) {
    const error = new Error("Invalid token");
    next(error);
    return;
  }

  // 3- check if user is found
  req.user = await User.findById(decoded.userId);

  if (!req.user) {
    const error = new Error("User not found");
    next(error);
    return;
  }

  // 4- check if user is authorized to access this page
  // i used toString() method because returning id as an objectId
  if (req.user._id.toString() !== decoded.userId) {
    const error = new Error("Unauthorized access");
    return next(error);
  }

  next();
});

// Middleware to check if user has specific roles
const allowedToAccess = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      const error = new Error(`Not allowed to access this api: ${req.baseUrl}`);
      res.json({ status: "Unsccess", message: error });
      return next(error);
    }
    next();
  });

// Exporting controllers
module.exports = { signup, login, auth, allowedToAccess };
