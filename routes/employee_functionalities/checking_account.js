const express = require('express');
const router = express.Router();
const {validateCheckingAccountForm} = require('../../models/checking_account');


// route to create new checking account
router.post('/create', (request,response)=>{
    const {error} = validateCheckingAccountForm(request.body);
    if(error){
        return response.status(400).send(error.message);
    }
    return response.send(request.body);

});

module.exports = router;