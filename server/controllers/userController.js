const User = require("../models/userModel");

/*
  @desc create user
  @route POST /api/user
  @access Private
*/
const createUser = async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist){
        return res.status(400).json({ message: "User already exists" });
    } 
        const user = await User.create({
          name,
          email,
          password,
          phone,
          profileImage: req.file.filename,
          role,
        });
    

    res.json({ data: user });
  } catch (error) {
    res.json({ message: error });
  }
};

/*
  @desc get users
  @route GET /api/user
  @access Private
*/
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/*
  @desc get one user
  @route GET /api/user/:id
  @access Private
*/
const getUser = async (req, res) => {
  const {email, password} = req.body
  try {
    const user = await User.findOne({email, password});

    if (!user){
        return res.status(404).json({ message: "User not found" });
    }
    res.json({user});

  } catch (error) {
    res.status(500).json({ message: error });
  }
};



module.exports = {
    createUser,
    getUsers,
    getUser,
  };