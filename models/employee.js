class Employee {

    static enterCheckingAccount(body) {
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

    static enterFixedDeposit(body) {

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
                    resolve(console.log("Succesful"));
                }
            )
        });

    }

    static enterNormalLoan(body) {

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

    static enterSavingsAccount(body) {
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

    static createIndividualCustomer(body) {
        return new Promise((resolve, reject) => {
            const result = pool.query("CALL create_individual_customer (?,?,?,?,?,?,?,?,?)",
                [
                    body.full_name,
                    body.address,
                    body.national_ID,
                    body.date_of_birth,
                    body.personal_contact_no,
                    body.residential_contact_no,
                    body.date_joined,
                    body.email,
                    body.password
                ],
                function (error, results, fields) {
                    if (error) {
                        reject(result);
                    };
                    resolve(console.log("Done"));
                }
            )
        })
    }

    static createCorporateCustomer(body) {
        return new Promise((resolve, reject) => {
            const result = pool.query("CALL create_corporate_customer (?,?,?,?,?,?,?,?,?,?)",
                [
                    body.company_registration_number,
                    body.company_name,
                    body.company_email,
                    body.address,
                    body.date_of_establishment,
                    body.contact_no,
                    body.date_joined,
                    body.correspondent,
                    body.correspondent_email,
                    body.password
                ],
                function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        reject(result);
                    };
                    resolve(console.log("Done"));
                }
            )
        })
    }

}

module.exports = Employee;
