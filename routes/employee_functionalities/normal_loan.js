const express = require('express');
const router = express.Router();
const {validateNormalLoan} = require('../../models/loan');
var path = require('path');
const _ = require('lodash');
const {
    pool
} = require('../../startup/mysql_database');

router.get('/normal', (request,response) => {
    response.send("normal loan");
});

router.post('/normal', async (request,response) => {
    const {error} = validateNormalLoan(request.body);

    if (error) return response.status(404).send(error.details[0].message);
    
    try {
        await createNormalLoan(_.pick(request.body,
            ["loan_plan_id", "account_id", "customer_id", "branch_id", "loan_installment", "created_date", "loan_amount"]));
    } catch (error) {
                return response.status(400).send(error);
    }

    return response.status(200).send(request.body);
    
});

function createNormalLoan(body) {

    return new Promise((resolve, reject) => {
        const result = pool.query("CALL create_normal_loan (?, ?, ?, ?, ?, ?, ?)",
            [
                body.loan_plan_id,
                body.account_id,
                body.customer_id,
                body.branch_id,
                body.loan_installment,
                body.created_date,
                body.loan_amount
            ],
            function (error, results, fields) {
                if (error) {
                    reject(error);
                };
                resolve(console.log("Succesful"));
            }
        )
    })
}


module.exports = router;