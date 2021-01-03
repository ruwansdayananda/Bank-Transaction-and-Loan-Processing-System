const Joi = require('joi');

function validatesSavingsAccForm(account) {
    
    const schema = Joi.object({
        "savings_account_id": Joi.string().required().alphanum().max(30),
        "branch_id": Joi.number().integer().required(),
        "customer_id":Joi.number().integer().required(),
        "savings_plan_id":Joi.number().integer().required(),
        "source_of_funds": Joi.string().required().alphanum().max(20),
        "started_date" : Joi.date().required(),
        "bank_balance" : Joi.number().positive().precision(2),
        "no_of_monthly_withdrawals" :Joi.number().integer().required(),
        "max_withdrawal_limit" :Joi.number().positive().precision(2),

    });
    return schema.validate(account);
}
exports.validatesSavingsAccForm = validatesSavingsAccForm;