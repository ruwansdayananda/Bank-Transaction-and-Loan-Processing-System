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

// GET REQUESTS
router.get('/individual', [auth, employee], (request, response) => {
    const get_customer_id = new Promise((resolve, reject) => {
        const query = pool.query("SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'bank' AND TABLE_NAME = 'individual_customer';",
            function (error, results, fields) {
                if (error) reject(error);
                else resolve(results);
            });
    });
    var id;
    get_customer_id
        .then(result => {
            console.log(result);
            id = (result[0].AUTO_INCREMENT).toString();
            console.log(id);
            return response.render('individual', {
                id: id
            });

        })
        .catch(error => {
            return response.status(400).send("Error");
        });
    // response.send(200);
    

    // response.sendFile(path.join(__dirname, '../../views/individual.html'));
});

router.get('/corporate', [auth, employee], (request, response) => {
    
    response.sendFile(path.join(__dirname, '../views/corporate.html'));
});

// POST REQUESTS 
router.post('/individual', [auth, employee], (request, response) => {
    const {
        error
    } = validateIndividual(request.body);

    if (error) {
        return response.status(400).send(error.details[0].message);
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
    }
    
    );

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

router.post('/corporate', [auth, employee], (request, response) => {
    const {
        error
    } = validateCorporate(request.body);
    if (error) {
        return response.status(404).send(error.details[0].message);
    }
    return response.status(200).send("No worries");
});



module.exports = router;
