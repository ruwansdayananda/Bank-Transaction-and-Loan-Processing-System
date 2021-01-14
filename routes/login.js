const express = require('express');
const path = require('path');
const router = express.Router();
const { login } = require('../controllers/login');
const isLoggedIn = require('../middleware/login');

router.get('/', (request, response) => {
        response.sendFile(path.join(__dirname, '../views/home.html'));
});
// route to authenticate login details 
router.post('/', login);


module.exports = router;