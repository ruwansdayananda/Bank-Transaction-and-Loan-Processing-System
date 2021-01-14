const express = require('express');
const path = require('path');
const router = express.Router();

// localhost:3000/branch_manager_functionalities/login
router.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '../../views/branch_manager_functionalities/login.html'));
});

module.exports = router;