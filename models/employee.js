const Joi = require('joi');

function validateEmployee(Employee){
    const date = new Date();
    const schema = Joi.object({
        'employee_id'        : Joi.string().min(10).alphanum().required(), 
        'full_name'          : Joi.string().required(),
        'address'            : Joi.string().string().required(),
        'branch_id'          : Joi.number().integer().required(),
        'date_of_birth'      : Joi.date().less(date.getFullYear() -18),
        'salary'             : Joi.number().positive().precision(2).required(),
        'date of employment' : Joi.date().required()
    });

    return schema.validate(Employee);
}

exports.validateEmployee = validateEmployee;
