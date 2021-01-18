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
    const {error} = validateLogIn(request.body);
    if (error) {
        return response.status(400).send(error.message);
    }
    const email = request.body.email;
    var password;
    var procedure;
    var redirect;
    if (request.body.privilege_level == 1)
    {
        procedure = "branch_manager";
        redirect = '../views/branch_manager_functionalities/home.html';
    }
    if (request.body.privilege_level == 2)
    {
        procedure = "employee";
        redirect = '../views/employee_functionalities/home.html';

    }
    if (request.body.privilege_level == 3)
    {
        procedure = "corporate_customer";
        redirect = '../views/customer_functionalities/home.html';

    }
    if (request.body.privilege_level == 4)
    {
        procedure = "individual_customer";
        redirect = '../views/customer_functionalities/home.html';
    }

    try {
        password = await getPassword(email, procedure);
         if (!password) {
             return response.status(400).send("User not registered");
        }
        const validPassword = await bcrypt.compare(request.body.password, password);
        console.log(validPassword);

        if (!validPassword) {
            return response.status(400).send("Invalid e-mail or password"); //Not 404 because you dont want to give that much info to the client
        }

        const payload = {
            email: email,
            privilege_level: request.body.privilege_level
        };

        const token = generateAuthToken(payload);
        // console.log(token);
        request.session.token = token;

        return response.status(200).sendFile(path.join(__dirname, redirect));
        
    } catch (error) {
        console.log(error.message);
        return response.status(500).send(error.message);
    }
}
exports.validateLogIn = validateLogIn;
exports.generateAuthToken = generateAuthToken;
exports.login = login;