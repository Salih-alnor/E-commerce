const Joi = require("joi");

// Sign-up schema validation function

const signupSchemaValidator = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.ref('password'),  // Confirm password must match the password field
    
  });



// Login schema validation function
const loginSchemaValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required('password is required'),
  });


  module.exports = {signupSchemaValidator, loginSchemaValidator};