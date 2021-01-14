const express = require('express');
const router = express.Router();
const {createOnlineLoan} = require('../../controllers/customer_functionalities/online_loan')

/**
 * @todo: html file
 */
router.get('/online', (request, response) => {
    response.send("online loan");
});

router.post('/online', createOnlineLoan);



module.exports= router;