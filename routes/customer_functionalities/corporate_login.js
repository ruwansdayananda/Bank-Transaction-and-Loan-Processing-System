const express = require('express');
const path = require('path');
const {
    pool
} = require('../../startup/mysql_database');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const {
    generateAuthToken
} = require('../../models/user');


if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

router.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '../../views/login.html'));
})

// route to authenticate login details 
router.post('/', async (request, response) => {
    const {
        error
    } = validateLogIn(request.body);
    if (error) {
        return response.status(400).send(error.message);
    }
    const email = request.body.email;
    var password;
    try {
        password = await getPassword(email);
        const validPassword = bcrypt.compare(request.body.password, password);

        if (!validPassword) {
            return response.status(400).send("Invalid e-mail or password"); //Not 404 because you dont want to give that much info to the client
        }
        return response.status(200).send("OK");
    } catch (error) {
        return response.status(500).send("Server error");
    }


});

function validateLogIn(login) {
    const schema = Joi.object({
        "email": Joi.string().required().email(),
        "password": Joi.string().min(5).max(1024).required()
    });
    return schema.validate(login);
}

function getPassword(email) {
    return new Promise((resolve, reject) => {
        const result = pool.query("SELECT login_corporate_customer (?) AS pw",
            [
                email
            ],
            function (error, results, fields) {
                if (error) {
                    reject(error);
                };
                resolve(results[0].pw);
            }
        )
    });

}

module.exports = router;