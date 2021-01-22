'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _config = _interopRequireDefault(require("../config/config"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _Book = _interopRequireDefault(require("../models/Book"));

var _User = _interopRequireDefault(require("../models/User"));

var _Review = _interopRequireDefault(require("../models/Review"));

var _List = _interopRequireDefault(require("../models/List"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const connection = new _sequelize.default(_config.default);

_Book.default.init(connection);

_User.default.init(connection);

_Review.default.init(connection);

_List.default.init(connection);

_Book.default.associate(connection.models);

_User.default.associate(connection.models);

_Review.default.associate(connection.models);

_List.default.associate(connection.models);

console.log('connection', connection);
var _default = connection; // =====================================================================
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

exports.default = _default;