const express = require('express');
const router = express.Router();
const {validateNormalLoan,validateOnlineLoan} = require('../models/loan');
var path = require('path');


router.get('/onlineLoan', (request,response) => {
    response.sendFile(path.join(__dirname, '../views/onlineLoan.html'));
});

router.get('/normalLoan', (request,response) => {
    response.sendFile(path.join(__dirname, '../views/normalLoan.html'));
});

router.post('/normalLoan', (request,response) => {
    const {error} = validateNormalLoan(request.body);

    if(error) return response.status(404).send(error.details[0].message);

    return response.status(200).send(request.body);
    
});

router.post('/onlineLoan', (request,response) => {
    const {error} = validateOnlineLoan(request.body);

    if(error) return response.status(404).send(error.details[0].message);

    return response.status(200).send(request.body);
    
});


module.exports = router;