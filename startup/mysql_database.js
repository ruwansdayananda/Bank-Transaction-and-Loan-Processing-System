var mysql = require('mysql');
const config = require('config');

module.exports = function () {
    var connection = mysql.createConnection({
        user: config.get("user"),
        host: config.get("host"),
        password: config.get("password"),
        port: config.get("port")
    });

    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }

        console.log('connected as id ' + connection.threadId);
    });

    connection.query('use bank', function (error, results, fields) {
        if (error) throw error;
        console.log("Success");
    });

    connection.query('show tables', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
    });

}