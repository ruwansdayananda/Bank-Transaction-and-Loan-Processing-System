
const bcrypt = require('bcrypt');
const _ = require('lodash');
const Joi = require('joi');
const Employee = require('../../models/Employee');
const Customer = require('../../models/Customer');

// =================================VALIDATIONS=================================================//

function validateIndividual(customer) {
    const now = Date.now();
    const cutoffDate = new Date(now - (1000 * 60 * 60 * 24 * 365 * 18));

    const schema = Joi.object({
        "full_name": Joi.string().pattern(new RegExp('^[a-z]+(?: [a-z]+)+$')).required().min(5), //the name must have at least two words seperated by a space
        "address": Joi.string().required(),
        "national_ID": Joi.string().required().min(10),
        "date_of_birth": Joi.date().max(cutoffDate).required()
            .messages({
                'date.max': `You must be at least 18 years old to register.`
            }),
        "residential_contact_no": Joi.string().required().min(10),
        "personal_contact_no": Joi.string().required().min(10),
        "date_joined": Joi.string().required(),
        "email": Joi.string().email().required(),
        "password": Joi.string().min(5).max(1024).required(),
        "confirm_password": Joi.string().valid(Joi.ref('password')).required()
    });
    return schema.validateAsync(customer);
}

function validateCorporate(company) {
    const schema = Joi.object({
        "company_registration_number": Joi.string().required(),
        "company_name": Joi.string().min(3).required(),
        "corporate_email": Joi.string().email().required(),
        "address": Joi.string().required(),
        "date_of_establishment": Joi.date().required(), //Constranins must be checked
        "contact_no": Joi.string().required().min(10),
        "date_joined": Joi.date().required(), // Constraints must be checked
        "correspondent": Joi.string().alphanum().required(),
        "correspondent_email": Joi.string().email().required(),
        "password": Joi.string().min(5).max(1024).required(),
        "confirm_password": Joi.string().valid(Joi.ref('password')).required()
    });
    return schema.validate(company);
}

// =================================================MAIN ROUTE FUNCTIONALITY=========================================================//
const createIndividualCustomer = async (request, response) => {
    const {error} = validateIndividual(request.body);

    if (error) {
        return response.status(400).send(error.details[0].message);
    }

    if (await Customer.isIndividualEmailRegistered(request.body.email)) {
        var err_msg = "This email address has already been registered";
        return response.render('employee/individual_error', {
            error_msg: err_msg,
            post_body: request.body
        });
    }

    const salt = await bcrypt.genSalt(10);
    request.body.password = await bcrypt.hash(request.body.password, salt);
    try {
        const result = await Employee.createIndividualCustomer(_.pick(request.body,
                    ["full_name", "address", "national_ID", "date_of_birth", "personal_contact_no", "residential_contact_no", "date_joined", "email", "password"]));

    } catch (error) {
        console.log(error);
        return response.status(400).send(error);
    }
    return response.status(200).redirect('/employee');
};

const createCorporateCustomer =  async (request, response) => {
    const {
        error
    } = validateCorporate(request.body);
    if (error) {
        return response.status(400).send(error.details[0].message);
    }

    if (await Customer.isCorporateEmailRegistered(request.body.email)) {
        var err_msg = "This email address has already been registered";
        return response.render('employee/corporate_error', {
            error_msg: err_msg,
            post_body: request.body
        });
    }


    const salt = await bcrypt.genSalt(10);
    request.body.password = await bcrypt.hash(request.body.password, salt);
    try {
        const result = await Employee.createCorporateCustomer(_.pick(request.body,
            ["company_registration_number", "company_name", "corporate_email", "address", "date_of_establishment", "contact_no", "date_joined", "correspondent", "correspondent_email", "password"]));

    } catch (error) {
        return response.status(400).send(error.sql);
    }
    return response.status(200).redirect('/customer');
};

const searchForCustomer = async (request, response) => {
    try {
        const savingsAccounts = await Employee.findCustomerSavingsAccount(request.params.id);
        if ((!(savingsAccounts)) || savingsAccounts.length == 0) {
            return response.render('employee/savings_account', {
                hasErrors: true,
                error_message: "This customer has no savings accounts created. Open a savings account before creating a fixed deposit"
            });
        }
        else {
            return response.render('employee/savings_account', {
                hasErrors: false,
                accounts: savingsAccounts
            });
        }
    }
    catch (error) {
        console.log(error);
        return response.status(500).send("Internal Server Error");
    }
}

const findCustomerProfile = async (req, res) => {
    const privilege_level = req.body.privilege_level;

    const profile = await Customer.getProfileInformation(req.body.customer_id,privilege_level);
    const savings_accounts = await Customer.getAllSavingsAccounts(req.body.customer_id);
    const checking_accounts = await Customer.getAllCheckingAccounts(req.body.customer_id);
    const fixed_deposits = await Customer.getAllFixedDeposits(req.body.customer_id);

    if (!profile || profile.length == 0) {
        return res.render('employee/customer_profile_and_functions', {
            customerExists: false
        });
    }
    return res.render('employee/customer_profile_and_functions', {
        customerExists: true,
        profile: profile,
        privilege_level:privilege_level,
        savings_accounts: savings_accounts,
        fixed_deposits: fixed_deposits,
        checking_accounts:checking_accounts
    }
    );
}


module.exports.createCorporateCustomer = createCorporateCustomer;
module.exports.findCustomerProfile = findCustomerProfile;
module.exports.createIndividualCustomer = createIndividualCustomer;
