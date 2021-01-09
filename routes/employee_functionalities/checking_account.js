const express = require('express');
const { resolve } = require('path');
const router = express.Router();
const {request} = require('express');
const {pool} = require('../../startup/mysql_database');
const {validateCheckingAccountForm} = require('../../models/checking_account');


// route to create new checking account
router.post('/create', (request,response)=>{
    const {error} = validateCheckingAccountForm(request.body);
    if(error){
        return response.status(400).send(error.message);
    }
    console.log(request);

    //Creating a promise object to pass the data in the request to database as a async function
    const insert_checking_account = new Promise((resolve,reject)=>{
        const query = pool.query('INSERT INTO checking_account VALUES (?,?,?,?,?)',
        [
            request.body.checking_account_id,
            request.body.branch_id,
            request.body.customer_id,
            request.body.started_date,
            request.body.bank_balance
        ],function (error, results, fields) {
            if (error) reject(error);
            else resolve(results);
        });
    });
    
    //promise.then and .catch
    insert_checking_account
        .then(result=>{console.log("Success !");
        // return statement is not working outside the then and catch
        return response.status(200).send("No worries");
    })
        .catch(error=>console.log(error.message));

    
    
});

module.exports = router;