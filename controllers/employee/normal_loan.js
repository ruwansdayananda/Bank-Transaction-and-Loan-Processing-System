const Joi = require('joi');
const _ = require('lodash');
const Employee = require('../../models/Employee');
const Lookup = require('../../models/Lookup');

function validateNormalLoan(NormalLoan) {

    const schema = Joi.object({
        "loan_plan_id": Joi.number().integer().required(),
        /**
         * @todo account id for normal loans to be restricted to just savings accounts or not?
         */
        "account_id": Joi.number().integer().required(),
        "loan_amount": Joi.number().positive().precision(2).required()
    });

    return schema.validate(NormalLoan);
}

const getNormalLoan = async (request, response) => {
    const today = Lookup.getTodayDate();
    try {
        const loan_plans = await Employee.getLoanPlans();
        return response.render('employee/normal_loan_creation_form', {
            today: today,
            loan_plans: loan_plans
        });
    }
    catch (error) {
        return response.status(500).send("Internal Server Error");
    }
    
};

const createNormalLoan = async (request,response) => {
    const { error } = validateNormalLoan(_.pick(request.body,
        ["loan_plan_id", "account_id", "loan_amount"]));
    if (error) return response.status(404).send(error.details[0].message);
    console.log(request.body);
    const loan_plan_id = request.body.loan_plan_id;
    const account_id = request.body.account_id;
    const created_date = Lookup.getTodayDate();
    const loan_amount = request.body.loan_amount;
    const months = parseInt(request.body.loan_period_in_months[parseInt(loan_plan_id)-1])
    const loan_installment = parseFloat(request.body.loan_amount)/months;
    
    try {
        await Employee.enterNormalLoan(loan_plan_id, account_id, request.session.customer_id, request.user.branch_id, loan_installment, created_date, loan_amount);
    } catch (error) {
                return response.status(400).send(error);
    }

    return response.status(200).send('/employee/home');
    
};

module.exports.getNormalLoan = getNormalLoan;
module.exports.createNormalLoan = createNormalLoan;