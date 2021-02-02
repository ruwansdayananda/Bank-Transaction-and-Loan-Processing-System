const { reject } = require('lodash');
const { resolve } = require('path');
const { pool } = require('../startup/mysql_database');

class Customer{

    static async isIndividualEmailRegistered(email) {
        var result = await new Promise((resolve, reject) => {
            const result = pool.query('SELECT customer_id FROM individual_customer WHERE email = ?',
                [email],
                function (error, results) {
                    if (error) {
                        reject(new Error(error.message));
                    }
                    resolve(results);
                }
            )
        })

        return result.length != 0;
    }

    

    static async isCorporateEmailRegistered(email) {
        var result = await new Promise((resolve, reject) => {
            const result = pool.query('SELECT customer_id FROM corporate_customer WHERE corporate_email = ?',
                [email],
                function (error, results) {
                    if (error) {
                        reject(new Error(error.message));
                    }
                    resolve(results);
                }
            )
        })

        return result.length != 0;
    }

    static withdrawMoney(body) {
        return new Promise((resolve,reject) => {
            const result = pool.query("CALL savings_account_money_withdrawal(?,?,?)",
            [
                body.date,
                body.account_id,
                body.withdrawal_amount,
            ],

            function (error, results, fields) {
                if (error) {
                    reject(error);
                }
                else{
                    resolve(console.log("successssss!!!"));
                }
                
            }
            )
        })
    }

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
            const result = pool.query("SELECT * FROM all_savings_accounts WHERE customer_id=?",
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

    static async getMaximumWithdrawAmount(body){
        return await new Promise((resolve,reject) => {
            const result = pool.query("SELECT max_withdrawal_limit,no_of_withdrawals_remaining FROM savings_account WHERE savings_account_id=?",
            [
                body.account_id
            ],
            
            function (error, results, fields) {
                if (error) {
                    console.log(error);
                    reject(error);
                };
                console.log(results);
                resolve(results);
            },
            
            )
        })
    }

    static getAllSavingsAccountsForWithdraw(customerID) {
        return new Promise((resolve, reject) => {
            const result = pool.query("SELECT savings_account_id,customer_id,no_of_withdrawals_remaining FROM all_savings_accounts WHERE customer_id=?",
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
            const result = pool.query("SELECT * FROM all_checking_accounts WHERE customer_id=?",
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
            const result = pool.query("SELECT * FROM all_fixed_deposits WHERE customer_id=?",
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
