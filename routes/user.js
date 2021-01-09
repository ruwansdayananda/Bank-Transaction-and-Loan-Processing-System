const express = require('express');
const { pool } = require('../startup/mysql_database');
const path = require('path');
const router = express.Router();
const { validateUser } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { ROLES } = require('../utils/roles');

router.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '../views/create_user.html'));
})
// route to create new checking account
router.post('/', async (request, response) => {
    const user = _.pick(request.body, ["email", "password", "privilege_level"]);
    const {
        error
    } = validateUser(user);
    if (error) {
        return response.status(400).send(error.message);
    }

    // Get the role of the user
    var role = user.privilege_level;
    console.log(role);

    role = parseInt(ROLES[role]); 
    console.log(role);

    // for password hashing
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const insert_user = new Promise((resolve, reject) => {
        const query = pool.query('INSERT INTO user VALUES (?, ?, ?)',
            [
                user.email,
                user.password,
                role
            ],
            function (error, results, fields) {
                if (error) reject(error);
                else resolve(results);
            });
        console.log(query);
    });
    insert_user
        .then(result => {
            return response.send("User created successfully");
        })
        .catch(error => {
            return response.status(400).send(error);

        });
});

module.exports = router;