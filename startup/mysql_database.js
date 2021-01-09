var mysql = require('mysql');
const config = require('config');

module.exports.pool = mysql.createConnection({
    connectionLimit: 10,
    user: config.get("user"),
    host: config.get("host"),
    password: config.get("password"),
    port: config.get("port"),
    database: config.get("database")
});

    // connection.connect(function (err) {
    //     if (err) {
    //         console.error('error connecting: ' + err.stack);
    //         return;
    //     }
    //     console.log('connected as id ' + connection.threadId);
    // });

    // return connection;

    // pool.query('show tables', function (error, results, fields) {
    //     if (error) throw error;
    //     console.log(results);
    // });

