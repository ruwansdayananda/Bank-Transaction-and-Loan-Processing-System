const Joi = require('joi');


function validateFixedDeposit(account) {
    
    const schema = Joi.object({
        "fixed_deposit_plan_id"     : Joi.number().integer().required(),
        "branch_id"                 : Joi.number().integer().required(),
        "savings_account_id"        : Joi.number().integer().required(),
        "customer_id"               : Joi.number().integer().required(),
        "deposit_amount"            : Joi.number().required().positive().precision(2),
        "started_date"              : Joi.date().required()

    });
    return schema.validate(account);
}
exports.validateFixedDeposit = validateFixedDeposit;