const express = require('express');
const router = express.Router();
const { createFixedDeposit } = require('../../controllers/employee/fixed_deposit');
const isEmployee = require('../../middleware/employee');
const isLoggedIn = require('../../middleware/login');
const path = require('path');

/**
 * @todo : add html file
 */

router.get('/', (req, res) => {
    return response.render('employee/fixed_deposit');

});

// route to create new savings account
router.post('/',[isLoggedIn,isEmployee], createFixedDeposit);


module.exports = router;



