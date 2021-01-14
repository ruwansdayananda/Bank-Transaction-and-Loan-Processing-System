const { pool } = require('../startup/mysql_database');

function getPassword(email, procedure) {
    return new Promise((resolve, reject) => {
        const result = pool.query("SELECT " + procedure + " (?) AS pw",
            [
                email
            ],
            function (error, results, fields) {
                if (error) {
                    reject(error);
                };
                console.log(result.sql);
                console.log(results);
                resolve(results[0].pw);
            }
        )
    });

}

exports.getPassword = getPassword;