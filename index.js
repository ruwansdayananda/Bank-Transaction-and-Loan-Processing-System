// run karanna kalin meh commands tika run karanna  folder eke terminal eke
// npm init
// npm i express
// npm i pg
// npm i nodemon

// vscode integrated terminal eke mokakhari code ekak wada natthan file explorer eke cmd open karalama execute

// gahana routes should be added to the startup folder

const express = require('express');
const app = express();

require('./startup/routes')(app);   //calling the function

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port ${port}...`));
