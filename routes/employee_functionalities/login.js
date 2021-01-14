const express = require('express');
const path = require('path');
const router = express.Router();

// URL: localhost:3000/employee/login
router.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '../../views/employee_functionalities/login.html'));
});

module.exports = router;