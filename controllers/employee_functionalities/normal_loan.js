const Joi = require('joi');

const Employee = require('../../models/Employee');

function validateNormalLoan(NormalLoan) {

    const schema = Joi.object({
        "loan_plan_id": Joi.number().integer().required(),
        "account_id": Joi.number().integer().required(),
        "customer_id": Joi.number().integer().required(),
        "branch_id": Joi.number().integer().required(),
        "loan_installment": Joi.number().positive().precision(2).required(),
        "created_date": Joi.date().required(),
        "loan_amount": Joi.number().positive().precision(2).required()
    });

    return schema.validate(NormalLoan);
}

const createNormalLoan = async (request,response) => {
    const {error} = validateNormalLoan(request.body);

    if (error) return response.status(404).send(error.details[0].message);
    
    try {
        await Employee.enterNormalLoan(_.pick(request.body,
            ["loan_plan_id", "account_id", "customer_id", "branch_id", "loan_installment", "created_date", "loan_amount"]));
    } catch (error) {
                return response.status(400).send(error);
    }

    return response.status(200).send(request.body);
    
};

module.exports.createNormalLoan = createNormalLoan;