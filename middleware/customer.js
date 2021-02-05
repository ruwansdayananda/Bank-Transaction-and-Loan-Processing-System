module.exports = function (request, response, next) {
    //this happens after auth
    //auth sets the user
    //basically we define that the operation after this middleware function can only be done if the user is a customer
    console.log(request.privilege_level);

    if (!(request.user.privilege_level == 3 ||request.user.privilege_level == 4))
    {
        return response.status(401).render("401");
    }
    console.log("customer")
    next();
    //401 Unauthorized: When the user tries to access a protected resource but doesnt provide a valid web token
    //                  So you give them another chance to send a valid web token
    //                  If they fail again you send a 403
    //403 Forbidden: 
}