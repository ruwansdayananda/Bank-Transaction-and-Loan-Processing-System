const routes = require('express').Router();
class Customer{

    static enterOnlineLoan(body) {
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

    static createOnlineLoan(body) {
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
}
module.exports = Customer;
