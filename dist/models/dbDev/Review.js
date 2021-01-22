"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

class Review extends _sequelize.Model {
  static init(connection) {
    super.init({
      critique: _sequelize.DataTypes.STRING,
      rating: _sequelize.DataTypes.NUMBER
    }, {
      sequelize: connection,
      tableName: 'reviews'
    });
  } // a book/user has many reviews/ratings
  // but a review/rating belongs to only one book/user
  // one-to-many


  static associate(models) {
    this.belongsTo(models.Book, {
      foreignKey: 'book_id',
      as: 'books',
      onDelete: 'CASCADE'
    });
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'users',
      onDelete: 'CASCADE'
    });
  }

}

var _default = Review;
exports.default = _default;