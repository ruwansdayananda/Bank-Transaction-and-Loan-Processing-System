const express = require('express');
const router = express.Router();
const {Customer, validateIndividual,validateCorporate} = require('../../models/customer');
const {pool} = require('../../startup/mysql_database');
const {request} = require('express');
var path = require("path");
const { resolve } = require('path');
const { func } = require('joi');

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
    
    create_individual_customer(request);

    return response.status(200).send("No worries");
});

router.post('/corporate', (request, response) => {
    const {
        error
    } = validateCorporate(request.body);
    if (error) {
        return response.status(404).send(error.details[0].message);
    }
    create_corporate_customer(request);
    return response.status(200).send("No worries");
});


//common functions

function get_next_id(acc_type) {
    return new Promise( (resolve,reject)=>{
        const query = pool.query(`SELECT max(customer_id) as id_no from ${acc_type} `,
            function(error,result,fields) {
                if(error) reject(error);
                else resolve(result)           
        });
    });
        
}

function insert_customer(customer_id,account_type) {
    return new Promise((resolve, reject) => {
        const query = pool.query('INSERT INTO customer VALUES (?, ?)',
            [
                customer_id,
                account_type
            ],
            function (error, results, fields) {
                if (error) reject(error);
                else resolve(results);
            });
    });
    
}

function insert_individual_customer(request) {

    return new Promise((resolve, reject) => {
        const query = pool.query('INSERT INTO individual_customer (full_name,address,national_ID,date_of_birth ,residential_contact_no,personal_contact_no,date_joined,email_address,password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
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
    
}

function insert_corporate_customer(request) {

    return new Promise((resolve, reject) => {
        const query = pool.query('INSERT INTO corporate_customer (company_registration_number,company_name,company_email_address,address ,date_of_establishment,contact_no,date_joined,correspondent,correspondent_email_address,password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)',
                [
                    request.body.company_registration_number,
                    request.body.company_name,
                    request.body.company_email_address,
                    request.body.address,
                    request.body.date_of_establishment,
                    request.body.contact_no,
                    request.body.date_joined,
                    request.body.correspondent,
                    request.body.correspondent_email_address,
                    request.body.password

                    
                ],
                function (error, results, fields) {
                    if (error) reject(error);
                    else resolve(results);
                });
    });
    
}


async function create_individual_customer(request) {
    try {
        let id = await get_next_id(request.body.account_type);
        console.log(id[0].id_no);
        if(id[0].id_no === null){
            id =100001;
        }
        else{
            id = id[0].id_no+1 
        }
        console.log(id);
        
        await insert_customer(id ,request.body.account_type);
        await insert_individual_customer(request);
        console.log('creation Success');
        
    } catch (error) {
        console.log(error);
        
    }

    
}


async function create_corporate_customer(request) {
    try {
        let id = await get_next_id(request.body.account_type);
        console.log(id[0].id_no);
        if(id[0].id_no === null){
            id =200001;
        }
        else{
            id = id[0].id_no+1 
        }
        console.log(id);
        
        await insert_customer(id ,request.body.account_type);
        await insert_corporate_customer(request);
        console.log('creation Success');
        
    } catch (error) {
        console.log(error);
        
    }

    
}


module.exports = router;
