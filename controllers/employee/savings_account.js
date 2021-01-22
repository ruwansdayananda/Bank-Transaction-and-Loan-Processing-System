
const Employee = require('../../models/Employee');
const Lookup = require('../../models/Lookup');
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
        "no_of_withdrawals_remaining": Joi.number().integer().required().max(5).min(0),
        "max_withdrawal_limit": Joi.number().positive().precision(2)
    });
    return schema.validate(account);
}

// route to create new savings account
const createSavingsAccount = async (request, response) => {
    const {error} = validateSavingsAccountForm(_.pick(request.body, ["branch_id", "customer_id", "started_date", "bank_balance", "no_of_withdrawals_remaining", "savings_plan_id", "max_withdrawal_limit", "source_of_funds"]));
    if(error){
        return response.status(400).send(error.message);
    }
    try {
        await Employee.enterSavingsAccount(_.pick(request.body, ["branch_id", "customer_id", "started_date", "bank_balance", "no_of_withdrawals_remaining", "savings_plan_id", "max_withdrawal_limit", "source_of_funds"]));
    } catch (error) {
        return  response.status(400).send(error.message);  
    }
    return response.send(request.body);
};

const getSavingsAccountForm = async (request, response) => {
    try {
        const plans = await Employee.getAllSavingsAccountPlans();
        const id = await Employee.getSavingsAccountID();
        const date = Lookup.getDate();
        console.log(id);
        return response.status(200).render('employee/savings_account', {
            plans: plans,
            id: id[0].AUTO_INCREMENT,
            branch_id: request.user.branch_id,
            date:date
        });
    } catch (error) {
        return response.status(500).send(error.message);
    }
};



module.exports.createSavingsAccount = createSavingsAccount;
module.exports.getSavingsAccountForm = getSavingsAccountForm;
