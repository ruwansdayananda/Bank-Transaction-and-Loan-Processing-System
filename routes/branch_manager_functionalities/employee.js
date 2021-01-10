const express = require('express');
const router = express.Router();
const pug = require('pug');
const {
    validateEmployee
} = require('../../models/employee');
const {
    validateIndividual,
    validateCorporate
} = require('../../models/customer');
const {
    pool
} = require('../../startup/mysql_database');
const _ = require('lodash');
const bcrypt = require('bcrypt');

var path = require("path");

// GET REQUESTS
router.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '../../views/employee.html'));
});

// POST REQUESTS

router.post('/create', async (request, response) => {
    const {
        error
    } = validateEmployee(request.body);
    if (error) {
        return response.status(404).send(error.details[0].message);
    }
    const salt = await bcrypt.genSalt(10);
    request.body.password = await bcrypt.hash(request.body.password, salt);
    try {
        const result = await createtEmployee(_.pick(request.body, ["full_name", "address", "branch_id", "date_of_birth", "salary", "date_of_employment", "email", "password"]));

    } catch (error) {
        return response.status(400).send(error.message);
    }
    return response.status(200).send(request.body);
});



function createtEmployee(body) {
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


module.exports = router;
