const express = require('express');
const path = require('path');
const router = express.Router();


// localhost:3000/customer/login/corporate
router.get('/corporate', (request, response) => {
    response.sendFile(path.join(__dirname, '../../views/customer/corporate_login.html'));
});


// localhost:3000/customer/login/individual

router.get('/individual', (request, response) => {
    response.sendFile(path.join(__dirname, '../../views/customer/individual_login.html'));

});

module.exports = router;