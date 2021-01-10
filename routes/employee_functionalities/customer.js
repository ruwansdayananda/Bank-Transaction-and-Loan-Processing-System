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
const auth = require('../../middleware/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');
// GET REQUESTS
router.get('/individual', [auth, employee], (request, response) => {
});

router.get('/corporate', [auth, employee], (request, response) => {
    
    response.sendFile(path.join(__dirname, '../views/corporate.html'));
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

router.post('/corporate', (request, response) => {
    const {
        error
    } = validateCorporate(request.body);
    if (error) {
        return response.status(404).send(error.details[0].message);
    }
    return response.status(200).send("No worries");
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


module.exports = router;
