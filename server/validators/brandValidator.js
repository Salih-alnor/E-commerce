const Joi = require("joi");

const brandValidatorSchema = Joi.object({
    name: Joi.string().min(3).required(),
    mainCategory: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
    subCategory: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
    image: Joi.string().required()
  
})

module.exports = { brandValidatorSchema };