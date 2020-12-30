
// meh deka kohomatath oni
const express = require('express');
const router = express.Router();

//basic structure of an endpoint
//request contains parameters that you use for processing
router.get('/', (request, response) => {
    response.send("Hello World");
});


module.exports = router;
