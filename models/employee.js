const Joi = require('joi');

function validateEmployee(Employee){
    const date = new Date();
    const schema = Joi.object({
        'employee_id'        : Joi.string().min(10).required(), 
        'full_name'          : Joi.string().required(),
        'address'            : Joi.string().string().required(),
        'branch_id'          : Joi.string().min(5).required(),
        'date_of_birth'      : Joi.date().greater(date.getFullYear() -50).less(date.getFullYear() -18),
        'salary'             : Joi.number().integer().required(),
        'date of employment' : Joi.date().required()
    });

    return schema.validate(Employee);
}

exports.validateEmployee = validateEmployee;