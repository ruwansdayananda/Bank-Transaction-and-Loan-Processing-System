const Joi = require('joi');

function validateCustomer(customer) {
    const schema = Joi.object({
        "customer_id": Joi.string().pattern(new RegExp('^SC.*SCR$')).required().min(15), //this regex means that the customer id has to start with SC and end with SCR with total 15 characters
        "full_name": Joi.string().pattern(new RegExp('^[a-z]+(?: [a-z]+)+$')).required().min(5),    //the name must have at least two words seperated by a space
        "address": Joi.string().required(),
        "national_ID": Joi.string().required().min(16),
        "date_of_birth": Joi.date().greater('1974-01-01').less('2003-12-31').required(),
        // "residential_contact_no": Joi.string().required().min(5),
        // "private_contact_no": Joi.string().required().min(5),
        // "date_joined": Joi.string().required().min(5),
        // "company_profile_id": Joi.boolean().required(),
        // "phone": Joi.string().required().min(5)
    })
    return schema.validate(customer);
}

exports.validateCustomer = validateCustomer;