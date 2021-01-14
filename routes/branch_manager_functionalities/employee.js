const express = require('express');
const router = express.Router();
const {validateEmployee} = require('../../models/employee');
const {pool} = require('../../startup/mysql_database');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const isLoggedIn = require('../../middleware/login');
var path = require("path");
const employee = require('../../middleware/employee');

// GET REQUESTS
router.get('/create', [isLoggedIn],(request, response) => {
    response.sendFile(path.join(__dirname, '../../views/branch_manager_functionalities/employee.html'));
});

// POST REQUESTS

// URL:localhost:3000/branch_manager/employee/create
router.post('/create', [isLoggedIn, employee], async (request, response) => {
    const { error } = validateEmployee(request.body);
    if (error) {
        return response.status(404).send(error.details[0].message);
    }
    const salt = await bcrypt.genSalt(10);
    request.body.password = await bcrypt.hash(request.body.password, salt);
    try {
        const result = await createEmployee(_.pick(request.body,
            ["full_name", "address", "branch_id", "date_of_birth", "salary", "date_of_employment", "email", "password"]));
    } catch (error) {
        return response.status(400).send(error.message);
    }
    return response.status(200).send(request.body);
});



function createEmployee(body) {
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
