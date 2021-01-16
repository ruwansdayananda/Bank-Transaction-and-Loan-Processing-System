const express = require('express');
const router = express.Router();
const {createOnlineLoan} = require('../../controllers/customer_functionalities/online_loan')
const isLoggedIn = require('../../middleware/login');
const isCustomer = require('../../middleware/customer');
/**
 * @todo: html file
 */
router.get('/online',[isLoggedIn,isCustomer], (request, response) => {
    response.send("online loan");
});

router.post('/online', createOnlineLoan);



module.exports= router;