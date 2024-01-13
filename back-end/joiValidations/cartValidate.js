const Joi = require("joi");

// schema to validate document
module.exports.cart_schema = Joi.object({
    userId: Joi.string().required(), 
    products: Joi.string().optional(), 
})