
const bcrypt = require('bcrypt');
const _ = require('lodash');
const Joi = require('joi');
const Employee = require('../../models/Employee');

// =================================VALIDATIONS=================================================//

function validateIndividual(customer) {
    const now = Date.now();
    const cutoffDate = new Date(now - (1000 * 60 * 60 * 24 * 365 * 18));

    const schema = Joi.object({
        "full_name": Joi.string().pattern(new RegExp('^[a-z]+(?: [a-z]+)+$')).required().min(5), //the name must have at least two words seperated by a space
        "address": Joi.string().required(),
        "national_ID": Joi.string().required().min(10),
        "date_of_birth": Joi.date().greater('1974-01-01').less(cutoffDate).required(),
        "residential_contact_no": Joi.string().required().min(10),
        "personal_contact_no": Joi.string().required().min(10),
        "date_joined": Joi.string().required(),
        "email": Joi.string().email().required(),
        "password": Joi.string().min(5).max(1024).required(),
    });
    return schema.validate(customer);
}

function validateCorporate(company) {
    const schema = Joi.object({
        "company_registration_number": Joi.string().required(),
        "company_name": Joi.string().min(3).required(),
        "company_email": Joi.string().email().required(),
        "address": Joi.string().required(),
        "date_of_establishment": Joi.date().required(), //Constranins must be checked
        "contact_no": Joi.string().required().min(10),
        "date_joined": Joi.date().required(), // Constraints must be checked
        "correspondent": Joi.string().alphanum().required(),
        "correspondent_email": Joi.string().email().required(),
        "password": Joi.string().min(5).max(1024).required(),

    });
    return schema.validate(company);
}

// =================================================MAIN ROUTE FUNCTIONALITY=========================================================//
const createIndividualCustomer = async (request, response) => {
    const {error} = validateIndividual(request.body);

    if (error) {
        return response.status(400).send(error.details[0].message);
    }

    const salt = await bcrypt.genSalt(10);
    request.body.password = await bcrypt.hash(request.body.password, salt);
    try {
        const result = await Employee.enterIndividualCustomer(_.pick(request.body,
                    ["full_name", "address", "national_ID", "date_of_birth", "personal_contact_no", "residential_contact_no", "date_joined", "email", "password"]));

    } catch (error) {
        return response.status(400).send(error.sql);
    }
    return response.status(200).send(request.body);
};

const createCorporateCustomer =  async (request, response) => {
    const {
        error
    } = validateCorporate(request.body);
    if (error) {
        return response.status(400).send(error.details[0].message);
    }
    const salt = await bcrypt.genSalt(10);
    request.body.password = await bcrypt.hash(request.body.password, salt);
    try {
        const result = await Employee.enterCorporateCustomer(_.pick(request.body,
            ["company_registration_number", "company_name", "company_email", "address", "date_of_establishment", "contact_no", "date_joined", "correspondent", "correspondent_email", "password"]));

    } catch (error) {
        return response.status(400).send(error.sql);
    }
    return response.status(200).send(request.body);
};



module.exports.createCorporateCustomer = createCorporateCustomer;
module.exports.createIndividualCustomer = createIndividualCustomer;
