import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

import database from './database';

const app = express();
const configureExpress = ()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.database = database;
    app.use('/', routes);

    return app;
}


export default async () =>{
    const app = configureExpress();
    await app.database.authenticate();
    console.info('PSQL database connection successfully made it!');

    return app;
}