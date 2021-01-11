const express = require('express');
const router = express.Router();
const {validateCheckingAccountForm} = require('../../models/checking_account');
const pug=require('pug');
const _ = require('lodash');
const {
    pool
} = require('../../startup/mysql_database');

/**
 * @todo this is just to check pug out, delete after
 */

router.get('/', (request, response) => {
    response.render('index.html');
})


// route to create new checking account
router.post('/create', async (request,response)=>{
    const {error} = validateCheckingAccountForm(request.body);
    if(error){
        return response.status(400).send(error.message);
    }

    try { await create_checking_account(_.pick(request.body, ["customer_id", "started_date", "bank_balance", "branch_id"])); }
    catch (error) {
        return response.status(400).send(error.message);
    }

    return response.send(request.body);


});


function create_checking_account(body) {
    return new Promise((resolve, reject) => {
        const result = pool.query("CALL create_checking_account (?,?,?,?)",
            [
                body.customer_id,
                body.started_date,
                body.bank_balance,
                body.branch_id,

            ],
            function (error, results, fields) {
                if (error) {
                    reject(error);
                };
                resolve(console.log("succesful"));
            }
        )
    })
}



module.exports = router;
