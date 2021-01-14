const express = require('express');
const router = express.Router();
const Employee = require('../../models/Employee');
const _ = require('lodash');
const Joi = require('joi');


// Validating checking account form 
function validateCheckingAccountForm(account) {

    const schema = Joi.object({

        "branch_id": Joi.number().integer().required(),
        "customer_id": Joi.number().required(),
        "started_date": Joi.date().required(),
        "bank_balance": Joi.number().positive().precision(2),

    });
    return schema.validate(account);

}


const createCheckingAccount = async (request,response)=>{
    const {error} = validateCheckingAccountForm(request.body);
    if(error){
        return response.status(400).send(error.message);
    }

    try {
        await Employee.enterCheckingAccount(_.pick(request.body, ["customer_id", "started_date", "bank_balance", "branch_id"]));
    }
    catch (error) {
        return response.status(400).send(error.message);
    }

    return response.send(request.body);


}

module.exports.createCheckingAccount = createCheckingAccount;
