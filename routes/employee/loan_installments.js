const express = require('express');
const router = express.Router();
const isEmployee = require('../../middleware/employee');
const isLoggedIn = require('../../middleware/login');

const { getLoanInstallmentInformation } = require('../../controllers/employee/loan_installments');

router.get('/', [isLoggedIn, isEmployee], getLoanInstallmentInformation);

router.post('/',[isLoggedIn,isEmployee], createFixedDeposit);

module.exports = router;



