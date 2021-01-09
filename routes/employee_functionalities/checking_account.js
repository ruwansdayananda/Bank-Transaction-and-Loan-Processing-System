const express = require('express');
const router = express.Router();
const {validateCheckingAccountForm} = require('../../models/checking_account');
const pug=require('pug');

// route to create new checking account
router.post('/create', (request,response)=>{
    const {error} = validateCheckingAccountForm(request.body);
    if(error){
        return response.status(400).send(error.message);
    }
    return response.send(request.body);

});

/**
 * @todo this is just to check pug out, delete after
 */

router.get('/', (request, response) => {
    response.render('index.html');
})

module.exports = router;