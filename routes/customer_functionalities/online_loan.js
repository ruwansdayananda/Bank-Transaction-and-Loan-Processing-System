const express = require('express');
const router = express.Router();
const {createOnlineLoan} = require('../../controllers/customer_functionalities/online_loan')
const isLoggedIn = require('../../middleware/login');
const isCustomer = require('../../middleware/customer');
/**
 * @todo: html file
 */

 //localhost:3000/customer/loan/online
router.get('/online',[isLoggedIn,isCustomer], (request, response) => {
    response.send("online loan");
});

router.post('/online', createOnlineLoan);



module.exports= router;