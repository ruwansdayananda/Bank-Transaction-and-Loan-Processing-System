const { pool } = require('../startup/mysql_database');

class BranchManager {

    static enterEmployee(body) {
    return new Promise((resolve, reject) => {
        const result = pool.query("CALL create_employee (?,?,?,?,?,?,?,?)",
            [
                body.full_name,
                body.address,
                body.branch_id,
                body.date_of_birth,
                body.salary,
                body.date_of_employment,
                body.email,
                body.password
            ],
            function (error, results, fields) {
                if (error) {
                    reject(error);
                };
                resolve(console.log("Done"));
            }
        )
    })
}
}

module.exports = BranchManager;