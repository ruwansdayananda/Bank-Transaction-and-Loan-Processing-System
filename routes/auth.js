const express = require('express');
const path = require('path');
const {pool} = require('../startup/mysql_database');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const { generateAuthToken } = require('../models/user');
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

router.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '../views/login.html'));
})

// route to authenticate login details 
router.post('/',  (request, response) => {
    const {
        error
    } = validateLogIn(request.body);
    if (error) {
        return response.status(400).send(error.message);
    }
    const email = request.body.email;

    const get_user = new Promise(async (resolve, reject) => {
        const query = pool.query('SELECT * FROM user WHERE email=?',
            [
                email
            ],
            function (error, results, fields) {
                if (error) reject(error);
                else {
                    resolve(results);
                };
            });
    });
    get_user
        .then(result => {
            const user = result[0];
            if (!user) {
                return response.status(400).send("User not registered");
            }
            const validPassword = bcrypt.compare(request.body.password, user.password);

            if (!validPassword) {
                return response.status(400).send("Invalid e-mail or password"); //Not 404 because you dont want to give that much info to the client
            }
            const token = generateAuthToken(user.email, user.privilege_level);
            var redirectTo;

            if (user.privilege_level == 0) {
                redirectTo = path.join(__dirname, '../views/branch_manager_functionalities/home.html');
            }
            else if (user.privilege_level == 1) {
                redirectTo = path.join(__dirname, '../views/employee_functionalities/home.html');
            }
            else if (user.privilege_level == 2) {
                redirectTo = path.join(__dirname, '../views/customer_functionalities/home.html');
            }
            console.log(token);
            localStorage.setItem('token', token)
            response.sendFile(redirectTo);
        })
        .catch(error => {
            return response.status(400).send(error.message)      //double r?
        });
});

function validateLogIn(login) {
    const schema = Joi.object({
        "email": Joi.string().required().email(),
        "password": Joi.string().min(5).max(1024).required()
    });
    return schema.validate(login);
}


module.exports = router;