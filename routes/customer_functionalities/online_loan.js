const express = require('express');
const router = express.Router();
const {validateOnlineLoan} = require('../../models/loan');

router.get('/online', (request, response) => {
    response.send("online loan");
});

router.post('/online', (request,response) => {
    const {error} = validateOnlineLoan(request.body);

    if(error) return response.status(404).send(error.details[0].message);

    return response.status(200).send(request.body);
    
});

module.exports= router;