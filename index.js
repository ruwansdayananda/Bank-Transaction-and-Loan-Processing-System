
// vscode integrated terminal eke mokakhari code ekak wada natthan file explorer eke cmd open karalama execute

// gahana routes should be added to the startup folder

const express = require('express');
const app = express();
const config = require('config');

// require('./startup/mysql_database');
require('./startup/routes')(app);   //calling the function

if (!config.has('jwtPrivateKey')) {
    console.error("FATAL ERROR : jwtPrivateKey not defined");
    process.exit(1);
}
console.log(config.get('jwtPrivateKey'));

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port ${port}...`));
