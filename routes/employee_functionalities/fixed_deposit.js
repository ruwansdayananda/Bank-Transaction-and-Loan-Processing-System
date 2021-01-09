const express = require('express');
const router = express.Router();
const {validateFixedDeposit} = require('../../models/fixed_deposit');


// route to create new savings account
router.post('/create', (request,response)=>{
    const {error} = validateFixedDeposit(request.body);
    if(error){
        return response.status(400).send(error.message);
    }
    return response.send(request.body);

});

module.exports = router;
