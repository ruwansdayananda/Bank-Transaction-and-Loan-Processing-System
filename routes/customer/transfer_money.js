const express = require('express');
const router = express.Router();
const {getTransactionForm,TranferAmount} = require('../../controllers/customer/transfer_money');

const isLoggedIn = require('../../middleware/login');
const isCustomer = require('../../middleware/customer');

  /**
     * @todo
     * incomplete 
     * laod alll the account of customer 
     */
    
router.get('/',[isLoggedIn,isCustomer],getTransactionForm);
router.post('/',[isLoggedIn,isCustomer],TranferAmount);
module.exports = router;