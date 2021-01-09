const express = require('express');
const router = express.Router();
const {validateNormalLoan,validateOnlineLoan} = require('../../models/loan');
var path = require('path');




router.get('/normal', (request,response) => {
    // response.sendFile(path.join(__dirname, '../views/normalLoan.html'));
    
    //dummy response 
    response.send("normal loan");
});

router.post('/normal', (request,response) => {
    const {error} = validateNormalLoan(request.body);

    if(error) return response.status(404).send(error.details[0].message);

    return response.status(200).send(request.body);
    
});




module.exports = router;