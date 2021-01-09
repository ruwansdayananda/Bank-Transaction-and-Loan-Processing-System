const express = require('express');
// const customer = require('../routes/customer');
// const employee = require('../routes/employee');
// const loan = require('../routes/loan');
// const savings_account = require('../routes/savings_account');

const routes = require('../routes')

module.exports = function (app) {

    app.use(express.json());
    
    app.use(express.urlencoded({ extended: true }));

    app.use('/', routes);
}


// /employee_functionalities/customer/corporate
// /employee_functionalities/customer/individual
// /branch_manager_functionalities/employee/create
// /employee_functionalities/loan/normal
// /employee_functionalities/loan/online
// /employee_functionalities/savings_account/create
// /employee_functionalities/checking_account/create
