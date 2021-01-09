const Joi = require('joi');

function validateNormalLoan(NormalLoan) {

    const schema = Joi.object({
        "normal_loan_id"    : Joi.string().alphanum().max(10).required(),
        "loan_plan_id"      : Joi.number().integer().required(),
        "account_id"        : Joi.string().alphanum().max(30).required(),
        "customer_id"       : Joi.string().alphanum().max(20).required(),
        "branch_id"         : Joi.number().integer().required(),
        "loan_installment"  : Joi.number().positive().precision(2).required(),
        "type"              : Joi.string().max(10).required(),
        "created_date"      : Joi.date().required(),
        "loan_amount"       : Joi.number().positive().precision(2).required()
        
    });

    return schema.validate(NormalLoan);
    
}

function validateOnlineLoan(onlineLoan) {

    const schema = Joi.object({
        "online_loan_id"    : Joi.string().alphanum().max(10).required(),
        "loan_plan_id"      : Joi.number().integer().required(),
        "fixed_deposit_id"  : Joi.string().alphanum().max(30).required(),
        "customer_id"       : Joi.string().alphanum().max(20).required(),
        "branch_id"         : Joi.number().integer().required(),
        "loan_installment"  : Joi.number().positive().precision(2).required(),
        "type"              : Joi.string().max(10).required(),
        "loan_amount"       : Joi.number().positive().precision(2).required(),
        "created_date"      : Joi.date().required()
    });

    return schema.validate(onlineLoan);
    
}

exports.validateNormalLoan = validateNormalLoan;
exports.validateOnlineLoan = validateOnlineLoan;