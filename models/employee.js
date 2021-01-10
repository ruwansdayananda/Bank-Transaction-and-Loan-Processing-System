const Joi = require('joi');

function validateEmployee(Employee){
    const now = Date.now();
    const cutoffDate = new Date(now - (1000 * 60 * 60 * 24 * 365 * 18));

    // console.log(date);
    const schema = Joi.object({
        'full_name'             : Joi.string().required(),
        'address'               : Joi.string().required(),
        'branch_id'             : Joi.number().integer().required(),
        'date_of_birth'         : Joi.date().max(cutoffDate),      //if less than 18 display error
        'salary'                : Joi.number().positive().precision(2).required(),
        'date_of_employment'    : Joi.date().required(),
        'email'                 : Joi.string().email().required(),
        'password'              : Joi.string().required(),
    });

    return schema.validate(Employee);
}

exports.validateEmployee = validateEmployee;
