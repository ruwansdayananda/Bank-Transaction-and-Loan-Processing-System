const { pool } = require('../startup/mysql_database');

class Lookup{


    static getDate() {
        const date = new Date();
        let day = ("0" + date.getDate()).slice(-2);
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let year = date.getFullYear();
        const today = year + "-" + month + "-" + day;
        return today;
    }


}

module.exports = Lookup;