const express = require('express');
const path = require('path');
const router = express.Router();

// URL: localhost:3000/employee/login
router.get('/', (request, response) => {
    response.render('employee/login');
});

module.exports = router;