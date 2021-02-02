const Customer = require('../../models/Customer');
const Lookup = require('../../models/Lookup');
const _ = require('lodash');
const Joi = require('joi');
const { result, max } = require('lodash');


function validateAmount(amount,maxAmount) {

    const schema = Joi.object({
        "amount": Joi.number().positive().max(maxAmount).required(),
        
    });
    return schema.validate(amount);

}

const getAllSavingsAccounts = async (req, res) => {
    const customer_id = req.user.customer_id;
    console.log(req.user.privilege_level);
    const accounts = await Customer.getAllSavingsAccounts(customer_id);
    return res.render('customer/view_all_savings_accounts', {
        accounts: accounts
    });
}

const getAllCheckingAccounts = async (req, res) => {
    const customer_id = req.session.customer_id;
    const accounts = await Customer.getAllCheckingAccounts(customer_id);
    return res.render('customer/view_all_checking_accounts', {
        accounts: accounts
    });
}

const getAllFixedDeposits = async (req, res) => {
    const customer_id = req.session.customer_id;
    const accounts = await Customer.getAllFixedDeposits(customer_id);
    return res.render('customer/view_all_fixed_deposits', {
        accounts: accounts
    });
}

const getAllSavingsAccountsForWithdraw = async (req, res) => {
    const customer_id = req.user.customer_id;
    const accounts = await Customer.getAllSavingsAccountsForWithdraw(customer_id);
    return res.render('customer/withdraw', {
        accounts: accounts
    });
}

const Withdraw = async (req, res) => {
    const accounts = await Customer.getMaximumWithdrawAmount( _.pick(req.body, ["account_id"]));

    var maxAmount = accounts[0].max_withdrawal_limit;
    var limit = accounts[0].no_of_withdrawals_remaining;

    const {error} = validateAmount( _.pick(req.body, ["amount"]),maxAmount);
    
    if(error) return res.status(404).send(error.details[0].message);

    if(limit<=0) return res.status(404).send("No more");

    req.body.date = Lookup.getTodayDate();
    req.body.withdrawal_amount = req.body.amount;

    try {
        const result = await Customer.withdrawMoney( _.pick(req.body,["date","account_id","withdrawal_amount"]));
        return res.render('customer/home');
     } catch (error) {
        console.log(error);
         
     }   
    
    
}




module.exports.getAllSavingsAccounts = getAllSavingsAccounts;
module.exports.getAllCheckingAccounts = getAllCheckingAccounts;
module.exports.getAllFixedDeposits = getAllFixedDeposits;
module.exports.getAllSavingsAccountsForWithdraw = getAllSavingsAccountsForWithdraw;
module.exports.Withdraw = Withdraw;