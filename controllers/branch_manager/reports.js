const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const BranchManager = require('../../models/BranchManager');

const generateTransactionsReport = async (request, response) => {
    const branch_id = request.user.branch_id;
    const month = request.body.month;
    const year = request.body.year;
    try {
        const results = await BranchManager.getTransactions(branch_id, month, year);
    }
    catch (error) {
        return response.status(500).render("500");
    }
    
};

const generateLateLoanInstallments = async (request, response) => {
    const branch_id = request.user.branch_id;
    const month = request.body.month;
    const year = request.body.year;

};


exports.generateTransactionsReport = generateTransactionsReport;
exports.generateLateLoanInstallments = generateLateLoanInstallments;
