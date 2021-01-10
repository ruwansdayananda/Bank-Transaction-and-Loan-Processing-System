const express = require('express');
const router = express.Router();
const {validateOnlineLoan} = require('../../models/loan');

const _ = require('lodash');
const {
    pool
} = require('../../startup/mysql_database');


router.get('/online', (request, response) => {
    response.send("online loan");
});

router.post('/online', async (request,response) => {
    const {error} = validateOnlineLoan(request.body);

    if(error) return response.status(404).send(error.details[0].message);

    try {
        await createOnlineLoan(_.pick(request.body, ["loan_plan_id", "fixed_deposit_id", "customer_id", "branch_id","loan_installment","loan_amount","created_date"]));
    } catch (error) {
        console.log(error.message);
    }

    return response.status(200).send(request.body);
    
});


function createOnlineLoan(body) {
    return new Promise((resolve, reject) => {
        const result = pool.query("CALL create_online_loan (?,?,?,?,?,?,?)",
            [
                body.loan_plan_id,
                body.fixed_deposit_id,
                body.customer_id,
                body.branch_id,
                body.loan_installment,
                body.loan_amount,
                body.created_date,

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
module.exports= router;