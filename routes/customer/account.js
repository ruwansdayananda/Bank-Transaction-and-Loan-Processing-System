const express = require('express');
const router = express.Router();
const {
    getAllSavingsAccounts,
    getAllCheckingAccounts,
    getAllFixedDeposits,
    getAllSavingsAccountsForWithdraw,
    Withdraw
} = require('../../controllers/customer/account');

const isLoggedIn = require('../../middleware/login');
const isCustomer = require('../../middleware/customer');

/**
 * @url: localhost:3000/customer/account/savings_accounts
 */
router.get('/savings_accounts', [isLoggedIn, isCustomer], getAllSavingsAccounts);

/**
 * @url: localhost:3000/customer/account/checking
 */
router.get('/checking_accounts', [isLoggedIn, isCustomer], getAllCheckingAccounts);

/**
 * @url: localhost:3000/customer/account/fixed_deposits
 */
router.get('/fixed_deposits', [isLoggedIn, isCustomer], getAllFixedDeposits);

router.get('/withdraw_money', [isLoggedIn, isCustomer], getAllSavingsAccountsForWithdraw);

router.post('/withdraw_money', [isLoggedIn, isCustomer], Withdraw);

module.exports = router;