const Joi = require('joi');

// Validating checking account form 
function validateCheckingAccountForm(account){

    const schema = Joi.object({

        "checking_account_id" : Joi.string().required().max(30),
        "branch_id" : Joi.number().integer().required(),
        "customer_id" : Joi.string().required().min(15),
        "started_date" : Joi.date().required(),
        "bank_balance" : Joi.number().positive().precision(2),

    });
    return schema.validate(account);

}

exports.validateCheckingAccountForm = validateCheckingAccountForm;