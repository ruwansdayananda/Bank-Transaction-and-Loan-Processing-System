module.exports = function (request, response, next) {
    //this happens after auth
    //auth sets the user
    //basically we define that the operation after this middleware function can only be done if the user is an employee

    if (request.privilege_level !=1) return response.status(403).send("Access denied");

    next();

    //401 Unauthorized: When the user tries to access a protected resource but doesnt provide a valid web token
    //                  So you give them another chance to send a valid web token
    //                  If they fail again you send a 403
    //403 Forbidden: 
}