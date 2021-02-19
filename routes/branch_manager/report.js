const routes = require('express').Router();
const isLoggedIn = require('../../middleware/login');
const isBranchManager = require('../../middleware/branch_manager');
const {
    generateTransactionsReport,
    generateLateLoanInstallments,
    generateReport
} = require('../../controllers/branch_manager/reports');

// http://localhost:3000/branch_manager/report/request
routes.get('/request', [isLoggedIn, isBranchManager], (req, res) => {
    return res.render('branch_manager/request_report');
});

// http://localhost:3000/branch_manager/report/transactions
// routes.post('/transactions', [isLoggedIn, isBranchManager], (generateTransactionsReport));


// http://localhost:3000/branch_manager/report/late_loan_installments
// routes.post('/late_loan_installments', [isLoggedIn, isBranchManager], generateLateLoanInstallments);

// http://localhost:3000/branch_manager/report
routes.post('/', [isLoggedIn, isBranchManager], generateReport);

module.exports = routes;