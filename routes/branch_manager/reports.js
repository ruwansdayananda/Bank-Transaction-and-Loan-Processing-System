const routes = require('express').Router();
const isLoggedIn = require('../../middleware/login');
const isBranchManager = require('../../middleware/branch_manager');
const { generateTransactionsReport,generateLateLoanInstallments } = require('../../controllers/branch_manager/reports');

// http://localhost:3000/branch_manager/report/request
routes.get('/request', [isLoggedIn, isBranchManager], (req, res) => {
    return req.render('branch_manager/request_report');
})

// http://localhost:3000/branch_manager/report/transactions
routes.post('/transactions', [isLoggedIn, isBranchManager], generateTransactionsReport);

// http://localhost:3000/branch_manager/report/late_loan_installments
routes.post('/late_loan_installments', [isLoggedIn, isBranchManager], generateLateLoanInstallments);

module.exports = routes;