const Customer = require('../../models/Customer');

const getAllSavingsAccounts = async (req, res) => {
    const customerID = req.user.customer_id;
    console.log(req.user.privilege_level);
    const accounts = await Customer.getAllSavingsAccounts(customerID);
    return res.render('customer/view_all_savings_accounts', {
        accounts: accounts
    });
}

const getAllCheckingAccounts = async (req, res) => {
    const customerID = req.session.customer_id;
    const accounts = await Customer.getAllCheckingAccounts(customerID);
    return res.render('customer/view_all_checking_accounts', {
        accounts: accounts
    });
}

const getAllFixedDeposits = async (req, res) => {
    const customerID = req.session.customer_id;
    const accounts = await Customer.getAllFixedDeposits(customerID);
    return res.render('customer/view_all_fixed_deposits', {
        accounts: accounts
    });
}

module.exports.getAllSavingsAccounts = getAllSavingsAccounts;
module.exports.getAllCheckingAccounts = getAllCheckingAccounts;
module.exports.getAllFixedDeposits = getAllFixedDeposits;