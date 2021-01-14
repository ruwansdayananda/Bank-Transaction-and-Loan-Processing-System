const express = require('express');
const router = express.Router();
const isLoggedIn = require('../../middleware/login');
const isEmployee = require('../../middleware/employee');
const {createCheckingAccount} = require('../../controllers/employee_functionalities/checking_account')

router.get('/', [isLoggedIn,isEmployee], (request, response) => {
    response.sendFile(path.join(__dirname, '../../views/employee_functionalities/checking_account.html'));
})

// route to create new checking account
router.post('/create', [isLoggedIn, isEmployee], createCheckingAccount);

module.exports = router;
