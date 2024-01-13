const Joi = require("joi");

// schema to validate document
module.exports.document_schema = Joi.object({
    documentLink: Joi.string().required(), 
    department: Joi.string().optional(), 
    documentType: Joi.string().optional(),
    geography: Joi.string().optional(), 
    technology: Joi.string().optional(),
    domain: Joi.string().optional(), 
    client: Joi.string().optional(), 
    fileType: Joi.string().optional(),
    description: Joi.string().optional(),
})