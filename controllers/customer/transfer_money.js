const { func } = require('joi');
const Joi = require('joi');
const _ = require('lodash');

const Customer = require('../../models/Customer');
const Lookup = require('../../models/Lookup');

function validateTranasaction(trans) {

    const schema = Joi.object({
        "initiating_account_id": Joi.number().integer().required(),
        "receiving_account_id": Joi.number().integer().required(),
        "transaction_amount": Joi.number().positive().precision(2).required(),
    });
    return schema.validate(trans);

}

const getTransactionForm = async (request,response)=>{
    try {
        const today = await Lookup.getTodayDate();
        const savingsIds = await Customer.getAllSavingsAccountIDs(request.user.customer_id);
        console.log(savingsIds);
        response.render('customer/transfer_money.ejs',{
            today:today,
            savingsIds:savingsIds
        })
    } catch (error) {
        response.status(400).send("ERROR");
    }




}


const TranferAmount = async (request,response)=>{
    const {error} = validateTranasaction(_.pick(request.body, ["initiating_account_id", "receiving_account_id","transaction_amount"]));

    if(error) return response.status(404).send(error.details[0].message);

    try {

        await Customer.tranferMoneySavings(_.pick(request.body, ["initiating_account_id", "receiving_account_id", "transaction_amount"]))
        response.send(request.body)
        
    } catch (error) {
        return response.send("ERROR IN TRANSFER")
    }



}
exports.getTransactionForm = getTransactionForm;
exports.TranferAmount = TranferAmount;