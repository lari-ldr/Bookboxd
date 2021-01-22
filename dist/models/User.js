"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

class User extends _sequelize.Model {
  static init(connection) {
    super.init({
      first_name: _sequelize.DataTypes.STRING,
      last_name: _sequelize.DataTypes.STRING,
      username: _sequelize.DataTypes.STRING,
      email: _sequelize.DataTypes.STRING
    }, {
      sequelize: connection,
      tableName: 'users'
    });
  } // a user has many reviews/ratings
  // but a review/rating belongs to only one user
  // one-to-many


  static associate(models) {
    this.hasMany(models.List, {
      foreignKey: {
        name: 'list_id'
      },
      as: 'lists',
      onDelete: 'CASCADE'
    });
  }

}

var _default = User;
exports.default = _default;