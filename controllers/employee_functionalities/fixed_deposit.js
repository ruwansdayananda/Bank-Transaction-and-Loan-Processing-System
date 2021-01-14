
const Joi = require('joi');
const _ = require('lodash');
const Employee = require('../../models/Employee');

function validateFixedDeposit(account) {

    const schema = Joi.object({
        "fixed_deposit_plan_id": Joi.number().integer().required(),
        "branch_id": Joi.number().integer().required(),
        "savings_account_id": Joi.number().integer().required(),
        "customer_id": Joi.number().integer().required(),
        "deposit_amount": Joi.number().required().positive().precision(2),
        "started_date": Joi.date().required()

    });
    return schema.validate(account);
}


// route to create new savings account
const createFixedDeposit = async (request,response)=>{
    const {error} = validateFixedDeposit(request.body);
    if(error){
        return response.status(400).send(error.message);
    }
    try {
        await Employee.enterFixedDeposit(_.pick(request.body, ["fixed_deposit_plan_id", "branch_id", "savings_account_id", "customer_id","deposit_amount","started_date"]));
        
    } catch (error) {
        response.status(400).send(error.message);
    }
    return response.send(request.body);

};

module.exports.createFixedDeposit = createFixedDeposit;



