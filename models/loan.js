const Joi = require('joi');

function validateNormalLoan(NormalLoan) {

    const schema = Joi.object({
        "loan_plan_id"      : Joi.number().integer().required(),
        "account_id"        : Joi.number().integer().required(),
        "customer_id"       : Joi.number().integer().required(),
        "branch_id"         : Joi.number().integer().required(),
        "loan_installment"  : Joi.number().positive().precision(2).required(),
        "type"              : Joi.string().max(15).required(),
        "created_date"      : Joi.date().required(),
        "loan_amount"       : Joi.number().positive().precision(2).required()
        
    });

    return schema.validate(NormalLoan);
    
}

function validateOnlineLoan(onlineLoan) {

    const schema = Joi.object({
        "loan_plan_id"      : Joi.number().integer().required(),
        "fixed_deposit_id"  : Joi.number().integer().required(),
        "customer_id"       : Joi.number().integer().required(),
        "branch_id"         : Joi.number().integer().required(),
        "loan_installment"  : Joi.number().positive().precision(2).required(),
        "type"              : Joi.string().max(15).required(),
        "loan_amount"       : Joi.number().positive().precision(2).required(),
        "created_date"      : Joi.date().required()
    });

    return schema.validate(onlineLoan);
    
}

exports.validateNormalLoan = validateNormalLoan;
exports.validateOnlineLoan = validateOnlineLoan;