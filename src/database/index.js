'use strict';
import Sequelize from 'sequelize';
import dbConfig from '../config/config';
import dotenv from 'dotenv';
import Book from '../models/Book';
import User from '../models/User';
import Review from '../models/Review';
import List from '../models/List';

dotenv.config();
const connection = new Sequelize(dbConfig);

Book.init(connection);
User.init(connection);
Review.init(connection);
List.init(connection);

Book.associate(connection.models);
User.associate(connection.models);
Review.associate(connection.models);
List.associate(connection.models);

export default connection;

// =====================================================================
// =====================================================================
// =====================================================================
// 'use strict';
// const dotenv = require('dotenv');
// dotenv.config();

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + './../config/config.js')[env];

// const Book = require('../models/Book.js')
// const User = require('../models/User.js')
// const Review = require('../models/Review.js')
// const List = require('../models/List.js')

// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// // db.sequelize = sequelize;
// // db.Sequelize = Sequelize;

// // module.exports = db;
// module.exports = sequelize;
