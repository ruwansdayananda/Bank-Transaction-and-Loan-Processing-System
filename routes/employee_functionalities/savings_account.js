const express = require('express');
const router = express.Router();
const {validateSavingsAccountForm} = require('../../models/savings_account');
const _ = require('lodash');
const {
    pool
} = require('../../startup/mysql_database');


// route to create new savings account
router.post('/create', async (request,response)=>{
    const {error} = validateSavingsAccountForm(request.body);
    if(error){
        return response.status(400).send(error.message);
    }

    try {
        await create_savings_Account(_.pick(request.body, ["branch_id", "customer_id", "started_date", "bank_balance","no_of_monthly_withdrawals","savings_plan_id","max_withdrawal_limit","source_of_funds"]));

        
    } catch (error) {
        return  response.status(400).send(error.message);
        
    }
    return response.send(request.body);

});

function create_savings_Account(body) {
    return new Promise((resolve, reject) => {
        const result = pool.query("CALL create_savings_account (?,?,?,?,?,?,?,?)",
            [
                body.branch_id,
                body.customer_id,
                body.started_date,
                body.bank_balance,
                body.no_of_monthly_withdrawals,
                body.savings_plan_id,
                body.max_withdrawal_limit,
                body.source_of_funds,


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
