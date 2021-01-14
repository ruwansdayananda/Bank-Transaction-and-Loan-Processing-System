const express = require('express');
const router = express.Router();
const { createNormalLoan } = require('../../controllers/employee_functionalities/normal_loan');

router.get('/normal', (request,response) => {
    response.send("normal loan");
});

router.post('/normal', createNormalLoan);


module.exports = router;