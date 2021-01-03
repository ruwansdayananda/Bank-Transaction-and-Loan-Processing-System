const express = require('express');
const router = express.Router();
const {validatesSavingsAccForm} = require('../models/savings_Acc');


router.post('/create', (request,response)=>{
    const {error} = validatesSavingsAccForm(request.body);
    if(error){
        return response.status(400).send(error.message);
    }
    return response.send(request.body);

});

module.exports = router;