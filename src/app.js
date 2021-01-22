const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const routes = require('./routes');
const chalk = require('chalk');

const database = require('./database');

const app = express();

const configureExpress = ()=>{
    dotenv.config();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.database = database;
    app.use('/', routes);

    return app;
}


module.exports = async () =>{
    const app = configureExpress();
    await app.database.authenticate();
    console.info(chalk.green('PSQL database connection successfully made it!'));

    return app;
}