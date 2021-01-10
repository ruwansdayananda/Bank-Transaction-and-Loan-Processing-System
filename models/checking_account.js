const Joi = require('joi');

// Validating checking account form 
function validateCheckingAccountForm(account){

    const schema = Joi.object({

        "branch_id" : Joi.number().integer().required(),
        "customer_id" : Joi.number().required(),
        "started_date" : Joi.date().required(),
        "bank_balance" : Joi.number().positive().precision(2),

    });
    return schema.validate(account);

}

exports.validateCheckingAccountForm = validateCheckingAccountForm;