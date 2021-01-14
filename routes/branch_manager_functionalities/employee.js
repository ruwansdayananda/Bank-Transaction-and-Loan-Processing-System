const router = require('express').Router();
var path = require("path");
const isLoggedIn = require('../../middleware/login');
const isEmployee = require('../../middleware/employee');
const { createEmployee } = require('../../controllers/branch_manager_functionalities/employee');

// GET REQUESTS
router.get('/create', [isLoggedIn],(request, response) => {
    response.sendFile(path.join(__dirname, '../../views/branch_manager_functionalities/employee.html'));
});

// POST REQUESTS

// URL:localhost:3000/branch_manager/employee/create
router.post('/create', [isLoggedIn, isEmployee], createEmployee);

module.exports = router;
