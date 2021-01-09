const express = require('express');
const router = express.Router();
const {Customer, validateIndividual,validateCorporate} = require('../../models/customer');
const {pool} = require('../../startup/mysql_database');
const {request} = require('express');
var path = require("path");

// GET REQUESTS
router.get('/individual', (request, response) => {
    response.sendFile(path.join(__dirname, '../../views/individual.html'));
});

router.get('/corporate', (request, response) => {
    response.sendFile(path.join(__dirname, '../../views/corporate.html'));
});

// POST REQUESTS 
router.post('/individual', (request, response) => {
    const {
        error
    } = validateIndividual(request.body);
    if (error) {
        return response.status(404).send(error.details[0].message);
    }
    console.log(request);

    const insert_customer = new Promise((resolve, reject) => {
        const query = pool.query('INSERT INTO customer VALUES (?, ?)',
            [
                request.body.individual_id,
                "Individual"
            ],
            function (error, results, fields) {
                if (error) reject(error);
                else resolve(results);
            });
    });
    const insert_individual_customer = new Promise((resolve, reject) => {
        const query = pool.query('INSERT INTO individual_customer VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                request.body.individual_id,
                request.body.full_name,
                request.body.address,
                request.body.national_ID,
                request.body.date_of_birth,
                request.body.residential_contact_no,
                request.body.personal_contact_no,
                request.body.date_joined,
                request.body.email_address,
                request.body.password
            ],
            function (error, results, fields) {
                if (error) reject(error);
                else resolve(results);
            });
    });
    insert_customer
        .then(result => {
            insert_individual_customer
                .then(result => console.log("Success"))
                .catch(error => console.log(error.message));
        })
        .catch(error => console.log(error.message));

    return response.status(200).send("No worries");
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



module.exports = router;
