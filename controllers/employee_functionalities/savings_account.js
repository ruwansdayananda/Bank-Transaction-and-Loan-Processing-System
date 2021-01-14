
const Employee = require('../../models/Employee');
const _ = require('lodash');
const Joi = require('joi');


function validateSavingsAccountForm(account) {

    const schema = Joi.object({
        "branch_id": Joi.number().integer().required(),
        "customer_id": Joi.number().integer().required(),
        "savings_plan_id": Joi.number().integer().required(),
        "source_of_funds": Joi.string().required().alphanum().max(20),
        "started_date": Joi.date().required(),
        "bank_balance": Joi.number().positive().precision(2),
        "no_of_monthly_withdrawals": Joi.number().integer().required().max(5).min(0),
        "max_withdrawal_limit": Joi.number().positive().precision(2)
    });
    return schema.validate(account);
}

// route to create new savings account
const createSavingsAccount =  async (request,response)=>{
    const {error} = validateSavingsAccountForm(request.body);
    if(error){
        return response.status(400).send(error.message);
    }
    try {
        await Employee.enterSavingsAccount(_.pick(request.body, ["branch_id", "customer_id", "started_date", "bank_balance", "no_of_monthly_withdrawals", "savings_plan_id", "max_withdrawal_limit", "source_of_funds"]));

    } catch (error) {
        return  response.status(400).send(error.message);  
    }
    return response.send(request.body);
};



module.exports.createSavingsAccount = createSavingsAccount;
