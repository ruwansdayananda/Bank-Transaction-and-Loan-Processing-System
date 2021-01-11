const express = require('express');
const { pool } = require('../startup/mysql_database');
const path = require('path');
const router = express.Router();
const { validateUser } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { ROLES } = require('../utils/roles');

router.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '../views/home.html'));
})

module.exports = router;