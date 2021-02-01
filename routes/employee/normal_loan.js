const express = require('express');
const router = express.Router();
const { getNormalLoan, createNormalLoan } = require('../../controllers/employee/normal_loan');
const isEmployee = require('../../middleware/employee');
const isLoggedIn = require('../../middleware/login');


router.get('/', [isLoggedIn, isEmployee], getNormalLoan);

router.post('/', [isLoggedIn, isEmployee], createNormalLoan);


module.exports = router;