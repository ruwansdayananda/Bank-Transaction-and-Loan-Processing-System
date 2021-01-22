const { pool } = require('../startup/mysql_database');

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

    static getAllSavingsAccounts(customerID) {
        return new Promise((resolve, reject) => {
            const result = pool.query("SELECT * FROM allsavingsaccounts WHERE customer_id=?",
                [
                    customerID

                ],
                function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        reject(error);
                    };
                    console.log(results);
                    resolve(results);
                }
            )
        })
        
    }

    static getAllCheckingAccounts(customerID) {
        return new Promise((resolve, reject) => {
            const result = pool.query("SELECT * FROM allcheckingaccounts WHERE customer_id=?",
                [
                    customerID

                ],
                function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        reject(error);
                    };
                    console.log(results);
                    resolve(results);
                }
            )
        })
    }

    static getAllFixedDeposits(customerID) {
        return new Promise((resolve, reject) => {
            const result = pool.query("SELECT * FROM allfixeddeposits WHERE customer_id=?",
                [
                    customerID
                ],
                function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        reject(error);
                    };
                    console.log(results);
                    resolve(results);
                }
            )
        })

    }

    static getProfileInformation(customerID, privilege_level) {
        let query;
        if (privilege_level == 3) {
            query = "SELECT * FROM corporate_customer WHERE customer_id=?"
        }
        else {
            query = "SELECT * FROM individual_customer WHERE customer_id=?"
        }

        return new Promise((resolve, reject) => {
            const result = pool.query(query,
                [
                    customerID
                ],
                function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        reject(error);
                    };
                    console.log(results);
                    resolve(results);
                }
            )
        })

    }
}
module.exports = Customer;
