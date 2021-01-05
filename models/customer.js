const Joi = require('joi');

function validateIndividual(customer) {
    const schema = Joi.object({

        "individual_id": Joi.string()
            // .pattern(new RegExp('^SC.*SCR$')) //this regex means that the customer id has to start with SC and end with SCR with total 15 characters
            .required().min(15)
            .messages({         //how to define custom messages
                'string.base': `"individual_id" should be text`,
                'string.empty': `"individual_id" cannot be an empty field`,
                'string.min': `"customer_id" should have a minimum length of 15`,
                'any.required': `"individual_id" is a required field`
            }),
        
        "full_name": Joi.string().pattern(new RegExp('^[a-z]+(?: [a-z]+)+$')).required().min(5),    //the name must have at least two words seperated by a space
        
        "address": Joi.string().required(),
        "national_ID": Joi.string().required().min(10),
        "date_of_birth": Joi.date().greater('1974-01-01').less('2003-12-31').required(),
        "residential_contact_no": Joi.string().required().min(10),
        "personal_contact_no": Joi.string().required().min(10),
        "date_joined": Joi.string().required(),
        "email_address": Joi.string().required(),
        "password": Joi.string().min(5).max(1024).required(),
    });
    return schema.validate(customer);
}

function validateCorporate(company) {
    const schema = Joi.object({

        "corporate_id": Joi.string()
            // .pattern(new RegExp('^SC.*SCR$')) //this regex means that the customer id has to start with SC and end with SCR with total 15 characters
            .required().min(20)
            .messages({         //how to define custom messages
                'string.base': `"corporate_id" should be text`,
                'string.empty': `"corporate_id" cannot be an empty field`,
                'string.regex': `"asdasda`,
                'string.min': `"corporate_id" should have a minimum length of 15`,
                'any.required': `"corporate_id" is a required field`
            }),

        "company_registration_number": Joi.string().required(),
        "company_name":Joi.string().min(3).required(),
        "company_email_address": Joi.string().max(319).required(),
        "address":Joi.string().required(),
        "date_of_establishment":Joi.date().required(),    //Constranins must be checked
        "contact_no":Joi.string().required().min(10),
        "date_joined":Joi.date().required(),     // Constraints must be checked
        "correspondent":Joi.string().alphanum().required(),
        "correspondent_email_address":Joi.string().max(319).required(),
        "password": Joi.string().min(5).max(1024).required(),
        
    });
    return schema.validate(company);
}

exports.validateIndividual = validateIndividual;
exports.validateCorporate = validateCorporate;