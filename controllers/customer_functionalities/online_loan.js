
const Customer = require('../../models/Customer')


function validateOnlineLoan(onlineLoan) {

    const schema = Joi.object({
        "loan_plan_id": Joi.number().integer().required(),
        "fixed_deposit_id": Joi.number().integer().required(),
        "customer_id": Joi.number().integer().required(),
        "branch_id": Joi.number().integer().required(),
        "loan_installment": Joi.number().positive().precision(2).required(),
        "loan_amount": Joi.number().positive().precision(2).required(),
        "created_date": Joi.date().required()
    });
    return schema.validate(onlineLoan);

}

const createOnlineLoan = async (request,response) => {
    const {error} = validateOnlineLoan(request.body);

    if(error) return response.status(404).send(error.details[0].message);

    try {
        await Customer.enterOnlineLoan(_.pick(request.body, ["loan_plan_id", "fixed_deposit_id", "customer_id", "branch_id","loan_installment","loan_amount","created_date"]));
    } catch (error) {
        console.log(error.message);
    }
    return response.status(200).send(request.body);
};


module.exports.createOnlineLoan = createOnlineLoan;