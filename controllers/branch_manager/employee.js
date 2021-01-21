
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const BranchManager = require('../../models/BranchManager');


function validateEmployee(Employee) {
    const now = Date.now();
    const cutoffDate = new Date(now - (1000 * 60 * 60 * 24 * 365 * 18));

    // console.log(date);
    const schema = Joi.object({
        'full_name': Joi.string().required(),
        'address': Joi.string().required(),
        'branch_id': Joi.number().integer().required(),
        'date_of_birth': Joi.date().max(cutoffDate), //if less than 18 display error
        'salary': Joi.number().positive().precision(2).required(),
        'date_of_employment': Joi.date().required(),
        'email': Joi.string().email().required(),
        'password': Joi.string().required(),
    });

    return schema.validate(Employee);
}
// POST REQUESTS

// URL:localhost:3000/branch_manager/employee/create
const createEmployee =  async (request, response) => {
    const { error } = validateEmployee(request.body);
    if (error) {
        return response.status(404).send(error.details[0].message);
    }

    const salt = await bcrypt.genSalt(10);
    request.body.password = await bcrypt.hash(request.body.password, salt);

    try {
        const result = await BranchManager.enterEmployee(_.pick(request.body,
            ["full_name", "address", "branch_id", "date_of_birth", "salary", "date_of_employment", "email", "password"]));
    } catch (error) {
        return response.status(400).send(error.message);
    }
    return response.status(200).send(request.body);
};

exports.createEmployee = createEmployee;

