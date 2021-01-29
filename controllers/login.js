const Joi = require('Joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getPassword } = require('../models/login');
const config = require('config');
const path = require('path');

function validateLogIn(login) {
    const schema = Joi.object({
        "email": Joi.string().required().email(),
        "password": Joi.string().min(5).max(1024).required(),
        "privilege_level":Joi.string().required()
    });
    return schema.validate(login);
}

function generateAuthToken(payload) {
    const token = jwt.sign(payload, config.get('jwtPrivateKey'), {
        expiresIn: process.env.ONE_HOUR
    });
    // console.log(token);
    return token;
}

const login = async (request, response) => {
    // if (!(request.session.token))
    // {
        const { error } = validateLogIn(request.body);
        if (error) {
            return response.status(400).send(error);
    }
    
        var table;
        var payload;
        if (request.body.privilege_level == 1) {
            table = "branch_manager";
            redirect = 'branch_manager/home';
        }
        if (request.body.privilege_level == 2) {
            table = "employee";
            redirect = 'employee/home';

        }
        if (request.body.privilege_level == 3) {
            table = "corporate_customer";
            redirect = 'customer/home'; e_level: request.body.privilege_level;
        }
        if (request.body.privilege_level == 4) {
            table = "individual_customer";
            redirect = 'customer/home';
        }

        try {
            result = await getPassword(request.body.email, table);
            if (!result) {
                return response.status(400).send("User not registered");
            }
            const validPassword = await bcrypt.compare(request.body.password, result.password);

            if (!validPassword) {
                return response.status(400).send("Invalid e-mail or password"); //Not 404 because you dont want to give that much info to the client
            }
            if (request.body.privilege_level == 1) {
                payload = {
                    manager_id: result.manager_id,
                    email: request.body.email,
                    privilege_level: request.body.privilege_level,
                    branch_id: result.branch_id
                };
            }
            if (request.body.privilege_level == 2) {
                payload = {
                    employee_id: result.employee_id,
                    email: request.body.email,
                    privilege_level: request.body.privilege_level,
                    branch_id: result.branch_id
                };

            }
            if (request.body.privilege_level == 3) {
                payload = {
                    customer_id: result.customer_id,
                    email: request.body.corporate_email,
                    name: result.company_name,
                    privilege_level: request.body.privilege_level
                };
            }
            if (request.body.privilege_level == 4) {
                payload = {
                    customer_id: result.customer_id,
                    email: request.body.email,
                    name: result.full_name,
                    privilege_level: request.body.privilege_level
                };
            }

            const token = generateAuthToken(payload);
            // console.log(token);
            request.session.token = token;
            return response.status(200).render(redirect);
            
        } catch (error) {
            console.log(error.message);
            return response.status(500).send(error);
        }
}
exports.validateLogIn = validateLogIn;
exports.generateAuthToken = generateAuthToken;
exports.login = login;