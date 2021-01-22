"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

class List extends _sequelize.Model {
  static init(connection) {
    super.init({
      title: _sequelize.DataTypes.STRING
    }, {
      sequelize: connection,
      tableName: 'lists'
    });
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: {
        name: 'user_id'
      },
      as: 'users'
    });
    this.belongsToMany(models.Book, {
      foreignKey: 'list_id',
      through: 'list_books',
      as: 'books'
    });
  }

}

var _default = List;
exports.default = _default;