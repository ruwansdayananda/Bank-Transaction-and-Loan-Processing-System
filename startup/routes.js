const express = require('express');
const customer = require('../routes/employee_functionalities/customer');
const savings_account = require('../routes/savings_account');

module.exports = function (app) {

    app.use(express.json());
    
    app.use(express.urlencoded({ extended: true }));

    //ENDPOINTS

    //Employees
    // app.use('/employee_functionalities/customer', customer);
    // app.use('/employee_functionalities/savings_account', savings_account);
    // app.use('/employee_functionalities/checking_account', checking_account);
    // app.use('/employee_functionalities/fixed_deposit', fixed_deposit);
    // app.use('/employee_functionalities/normal_loan', normal_loan);

    //Customers


    //Branch Managers

    //savings_acc end point
    

}
