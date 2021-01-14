// Express stuff
const express = require('express');
const router = express.Router();
var path = require("path");
// Model
const { validateIndividual, validateCorporate } = require('../../models/customer');

// DB connection
const { pool } = require('../../startup/mysql_database');

// Middleware
const employee = require('../../middleware/employee');
const login = require('../../middleware/login');
const bcrypt = require('bcrypt');
const _ = require('lodash');
// GET REQUESTS
router.get('/individual', [login, employee], (request, response) => {
    response.sendFile(path.join(__dirname, '../../views/employee_functionalities/individual.html'));

});

router.get('/corporate', [login, employee], (request, response) => {
    response.sendFile(path.join(__dirname, '../../views/employee_functionalities/corporate.html'));

});

// POST REQUESTS 
/**
 * @todo add authentication
 */
router.post('/individual', async (request, response) => {
    const {
        error
    } = validateIndividual(request.body);

    if (error) {
        return response.status(400).send(error.details[0].message);
    }

    const salt = await bcrypt.genSalt(10);
    request.body.password = await bcrypt.hash(request.body.password, salt);
    try {
        const result = await createIndividualCustomer(_.pick(request.body,
                    ["full_name", "address", "national_ID", "date_of_birth", "personal_contact_no", "residential_contact_no", "date_joined", "email", "password"]));

    } catch (error) {
        return response.status(400).send(error.sql);
    }
    return response.status(200).send(request.body);
});

router.post('/corporate',async (request, response) => {
    const {
        error
    } = validateCorporate(request.body);
    if (error) {
        return response.status(400).send(error.details[0].message);
    }
    const salt = await bcrypt.genSalt(10);
    request.body.password = await bcrypt.hash(request.body.password, salt);
    try {
        const result = await createCorporateCustomer(_.pick(request.body,
            ["company_registration_number", "company_name", "company_email", "address", "date_of_establishment", "contact_no", "date_joined", "correspondent", "correspondent_email", "password"]));

    } catch (error) {
        return response.status(400).send(error.sql);
    }
    return response.status(200).send(request.body);
});

function createIndividualCustomer(body) {
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

function createCorporateCustomer(body) {
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


module.exports = router;
