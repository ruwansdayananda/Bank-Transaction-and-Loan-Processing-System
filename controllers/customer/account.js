const Customer = require('../../models/Customer');
const Lookup = require('../../models/Lookup');
const _ = require('lodash');
const Joi = require('joi');


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
    const customer_id = req.user.customer_id;
    const accounts = await Customer.getAllCheckingAccounts(customer_id);
    return res.render('customer/view_all_checking_accounts', {
        accounts: accounts
    });
}

const getAllFixedDeposits = async (req, res) => {   
    const customer_id = req.user.customer_id;
    const accounts = await Customer.getAllFixedDeposits(customer_id);
    return res.render('customer/view_all_fixed_deposits', {
        accounts: accounts
    });
}

const getAllSavingsAccountsForWithdraw = async (req, res) => {
    const customer_id = req.user.customer_id;
    const accounts = await Customer.getAllSavingsAccountsForWithdraw(customer_id);
    console.log(accounts);
    return res.render('customer/withdraw', {
        accounts: accounts
    });
}

const Withdraw = async (req, res) => {

    console.log(req.body);

    req.body.account = JSON.parse(req.body.account_id);
    var maxAmount = req.body.account.max_withdrawal_limit;
    var limit = req.body.account.no_of_withdrawals_remaining;

    const {error} = validateAmount( _.pick(req.body, ["amount"]),maxAmount);
    
    if (error)
    {
        console.log(error);
        return response.status(400).render('400', {
            err_msg: error
        });
    }

    req.body.account.date = Lookup.getTodayDate();
    req.body.account.withdrawal_amount = req.body.amount;
    console.log(req.body);

    if (parseFloat(req.body.account.withdrawal_amount) <= parseFloat(req.body.account.bank_balance) && limit - 1 >= 0 && parseFloat(req.body.amount) <= parseFloat(maxAmount))
    {
        try {
            const result = await Customer.withdrawMoney(req.body.account.date, req.body.account.savings_account_id, req.body.account.withdrawal_amount);
            return res.render('customer/home');
        }
        catch (error) {
        console.log(error);
        return response.render('500', {
            err_msg: error
        });
        }
    } 
    else {
        console.log("Insufficient bank balance");
        return response.render('400', {
            err_msg: error
        });
    }
    
    
}




module.exports.getAllSavingsAccounts = getAllSavingsAccounts;
module.exports.getAllCheckingAccounts = getAllCheckingAccounts;
module.exports.getAllFixedDeposits = getAllFixedDeposits;
module.exports.getAllSavingsAccountsForWithdraw = getAllSavingsAccountsForWithdraw;
module.exports.Withdraw = Withdraw;