const Joi = require('joi');

//validation for the savings account creation form
function validateSavingsAccountForm(account) {
    
    const schema = Joi.object({
        "savings_account_id": Joi.string().required().alphanum().max(30),
        "branch_id": Joi.number().integer().required(),
        "customer_id":Joi.string().required().min(15),
        "savings_plan_id":Joi.number().integer().required(),
        "source_of_funds": Joi.string().required().alphanum().max(20),
        "started_date" : Joi.date().required(),
        "bank_balance" : Joi.number().positive().precision(2),
        "no_of_monthly_withdrawals": Joi.number().integer().required().max(5).min(0),
        // max_withdrawal_limit danawada kiyala sure nadda?
        "max_withdrawal_limit": Joi.number().positive().precision(2),
        

    });
    return schema.validate(account);
}
exports.validateSavingsAccountForm = validateSavingsAccountForm;
