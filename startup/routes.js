const express = require('express');
const config = require('config');
const path = require('path');
const routes = require('../routes');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
var crypto = require('crypto');
var uuid = require('node-uuid');
module.exports = function (app) {

    app.use(express.json());
    const options = {
        user: config.get("user"),
        host: config.get("host"),
        password: config.get("password"),
        port: config.get("port"),
        database: config.get("database")
    }
    app.use(session({
        genid: (req) => {
            console.log('Inside the session middleware')
            console.log(req.sessionID)
            return uuid() // use UUIDs for session IDs
        },
        secret: config.get('jwtPrivateKey'),
        resave: false,
        store: new MySQLStore(options),
        saveUninitialized: false,
        cookie: {
            maxAge: 1000*60*60
        }
    }));
    
    app.use(express.urlencoded({ extended: true }));

    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'pug');

    app.use('/', routes);
}
