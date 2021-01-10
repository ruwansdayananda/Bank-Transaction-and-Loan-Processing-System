const express = require('express');
const router = express.Router();
const {validateFixedDeposit} = require('../../models/fixed_deposit');

const _ = require('lodash');
const {
    pool
} = require('../../startup/mysql_database');


// route to create new savings account
router.post('/create', async (request,response)=>{
    const {error} = validateFixedDeposit(request.body);
    if(error){
        return response.status(400).send(error.message);
    }

    try {
        await create_fixed_deposit(_.pick(request.body, ["fixed_deposit_plan_id", "branch_id", "savings_account_id", "customer_id","deposit_amount","started_date"]));
        
    } catch (error) {
        response.status(400).send(error.message);
    }
    return response.send(request.body);

});

module.exports = router;

function create_fixed_deposit(body) {

    return new Promise((resolve, reject) => {
        const result = pool.query("CALL create_fixed_deposit (?,?,?,?,?,?)",
            [
                body.fixed_deposit_plan_id,
                body.branch_id,
                body.savings_account_id,
                body.customer_id,
                body.deposit_amount,
                body.started_date,


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

