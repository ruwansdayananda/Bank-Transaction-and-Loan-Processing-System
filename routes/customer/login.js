const express = require('express');
const path = require('path');
const router = express.Router();


// localhost:3000/customer/login/corporate
router.get('/corporate', (request, response) => {
    response.render('customer/corporate_login');
});


// localhost:3000/customer/login/individual

router.get('/individual', (request, response) => {
    response.render( 'customer/individual_login');

});

module.exports = router;