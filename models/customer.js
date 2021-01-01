const Joi = require('joi');

function validateCustomer(customer) {
    const schema = Joi.object({

        "customer_id": Joi.string()
            // .pattern(new RegExp('^SC.*SCR$')) //this regex means that the customer id has to start with SC and end with SCR with total 15 characters
            .required().min(15)
            .messages({         //how to define custom messages
                'string.base': `"customer_id" should be text`,
                'string.empty': `"customer_id" cannot be an empty field`,
                'string.regex': `"asdasda`,
                'string.min': `"customer_id" should have a minimum length of 15`,
                'any.required': `"customer_id" is a required field`
            }),
        
        "full_name": Joi.string().pattern(new RegExp('^[a-z]+(?: [a-z]+)+$')).required().min(5),    //the name must have at least two words seperated by a space
        "address": Joi.string().required(),
        "national_ID": Joi.string().required().min(10),
        "date_of_birth": Joi.date().greater('1974-01-01').less('2003-12-31').required(),
        "residential_contact_no": Joi.string().required().min(10),
        "private_contact_no": Joi.string().required().min(10),
        "date_joined": Joi.string().required(),
        "company_profile_id": Joi.boolean().required(),
        "password": Joi.string().min(5).max(1024).required(),
    });
    return schema.validate(customer);
}

exports.validateCustomer = validateCustomer;