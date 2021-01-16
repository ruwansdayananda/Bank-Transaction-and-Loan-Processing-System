const { pool } = require('../startup/mysql_database');

function getPassword(email, procedure) {
    return new Promise((resolve, reject) => {
        const result = pool.query("CALL " + procedure + " (?)",
            [
                email
            ],
            function (error, results, fields) {
                if (error) {
                    reject(error);
                };
                console.log(result.sql);
                console.log(results);
                console.log(results[0]);
                console.log(results[0][0]);
                resolve(results[0][0].password);
            }
        )
    });

}

exports.getPassword = getPassword;