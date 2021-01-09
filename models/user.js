const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

//validation for the savings account creation form
function validateUser(user) {

    const schema = Joi.object({
        "email": Joi.string().required().email(),
        "password": Joi.string().min(5).max(1024).required(),
        "privilege_level": Joi.string()
    });
    return schema.validate(user);
}

function generateAuthToken(email, privilege_level) {
    const token = jwt.sign({
            email: email,
            privilege_level: privilege_level,
        },
        config.get('jwtPrivateKey'));

    return token;
}
exports.generateAuthToken = generateAuthToken;
exports.validateUser = validateUser;
