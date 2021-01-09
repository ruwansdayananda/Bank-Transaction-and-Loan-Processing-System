const jwt = require('jsonwebtoken');
const config = require('config');
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

module.exports = function (request, response, next) {
    const token = localStorage.getItem('token');
    console.log(token);
    //if no token, client doesnt have needed permissions
    if (!token) {
        return response.status(401).send("Access denied. No token provided");
    }
    try {
        const decoded = jwt.verify(token, config.get("jwtPrivateKey")); //this gives the payload
        request.user = decoded;
        console.log(request.user);
        response.header("x-auth-token", token);
        next(); //calls the route handler
    } catch (error) {
        console.log(token);
        response.status(400).send("Invalid token");
        return;
    }
}
