const express = require('express');
const path = require('path');
const router = express.Router();
const { login } = require('../controllers/login');

router.get('/', (request, response) => {
        response.render('home');
});
// route to authenticate login details 
router.post('/', login);


module.exports = router;