const express = require('express');
const path = require('path');
const router = express.Router();
const isLoggedIn = require('../middleware/login');

router.get('/', [isLoggedIn], (request, response) => {
    // this route will only execute if user is logged in
    if (request.privilege_level == 1) {
        return response.render('branch_manager/home');
    }
    if (request.privilege_level == 2) {
        return response.sendFile('employee/home');
    }
    if (request.privilege_level == 3) {
        return response.sendFile('customer/home');
    }
    if (request.privilege_level == 4) {
        return response.sendFile('customer/home');
    }
})

module.exports = router;