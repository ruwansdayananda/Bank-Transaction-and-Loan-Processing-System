const express = require('express');
const router = express.Router();
const { login } = require('../controllers/login');
const isLoggedIn = require('../middleware/login');
router.get('/', (request, response) => {
        response.render('home');
});
// route to authenticate login details 
router.post('/' ,login);


module.exports = router;