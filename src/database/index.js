'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development' || 'test';
const config = require(`${__dirname}/../config/config.js`)[env];

const db = {};
const databases = Object.keys(config.databases);
for(let i = 0; i < databases.length; i++){
  let database = databases[i];
  let dbPath = config.databases[database];

  db[database] = new Sequelize(dbPath.database, dbPath.username, dbPath.password, dbPath);
};

fs
  .readdirSync(__dirname + '/../models/dbDev')
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
    .forEach(file => {
      const model = db.DbDev.import(path.join(__dirname + '/../models/dbDev', file));
      db[model.name] = model;
    });

fs
  .readdirSync(__dirname + '/../models/dbTest')
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = db.DbTest.import(path.join(__dirname + '/../models/dbTest', file));
    db[model.name] = model;
  });

  module.exports = db;
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
