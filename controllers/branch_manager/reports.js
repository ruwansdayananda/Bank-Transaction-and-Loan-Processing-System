const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const BranchManager = require('../../models/BranchManager');

const generateTransactionsReport = async (request, response) => {
    const branch_id = request.user.branch_id;
    const month = request.body.month;
    const year = request.body.year;
    try {
        const results = await BranchManager.getAllTransations(branch_id, month, year);
        return response.status(200).render('branch_manager/transactions_report', {
            transactions:results
        });
    }
    catch (error) {
        return response.status(500).render("500");
    }
    
};

const generateLateLoanInstallments = async (request, response) => {
    const branch_id = request.user.branch_id;
    const month = request.body.month;
    const year = request.body.year;
    try {
        const results = await BranchManager.getLateLoanInstallments(branch_id, month, year);
        return response.status(200).render('branch_manager/late_loan_installments_report', {
            installments: results
        });
    } catch (error) {
        return response.status(500).render("500");
    }
};


exports.generateTransactionsReport = generateTransactionsReport;
exports.generateLateLoanInstallments = generateLateLoanInstallments;
