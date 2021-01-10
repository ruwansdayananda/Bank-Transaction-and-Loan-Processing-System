const express = require('express');
const router = express.Router();
const pug=require('pug');
const {
    validateEmployee
} = require('../../models/employee');
const { validateIndividual, validateCorporate } = require('../../models/customer');
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
    console.log("Before")
    try
    {
        const result = await getEmployee(request);

    }
    catch (error) {
        response.status(400).send(error.message);
    }
    // console.log(result);
    console.log("After")
    return response.status(200).send(request.body);
});



function getEmployee(request) {
    return new Promise((resolve, reject) => {
        const result = pool.query("CALL create_employee (?,?,?,?,?,?,?,?)",
            [
                request.body.full_name,
                request.body.address,
                request.body.branch_id,
                request.body.date_of_birth,
                request.body.salary,
                request.body.date_of_employment,
                request.body.email,
                request.body.password
            ],
            function (error, results, fields) {
                if (error) {
                    reject(error);
                };
                resolve(console.log("Done"));
            }
        )
    }
    )
}


module.exports = router;
