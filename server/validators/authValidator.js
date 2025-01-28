const Joi = require("joi");

// Sign-up schema validation function

const signupSchemaValidator = Joi.object({
  user_name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirm_password: Joi.string().valid(Joi.ref("password")), // Confirm password must match the password field
  role: Joi.string(),
});

// Login schema validation function
const loginSchemaValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required("password is required"),
});

module.exports = { signupSchemaValidator, loginSchemaValidator };
