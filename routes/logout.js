const routes = require('express').Router();
const session = require('express-session');

routes.post('/', (req, res) => {
    console.log(req.session);
    if (req.session) {
        req.session.destroy();
    }
    console.log(req.session);
    res.redirect('/');
})


module.exports = routes;
