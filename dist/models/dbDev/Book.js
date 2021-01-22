"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

class Book extends _sequelize.Model {
  static init(connection) {
    super.init({
      name: _sequelize.DataTypes.STRING,
      author: _sequelize.DataTypes.STRING,
      genre: _sequelize.DataTypes.STRING
    }, {
      sequelize: connection,
      tableName: 'books'
    });
  } // a book has many reviews/ratings
  // but a review/rating belongs to only one book
  // one-to-many


  static associate(models) {
    this.hasMany(models.Review, {
      foreignKey: 'book_id',
      as: 'reviews'
    });
    this.belongsToMany(models.List, {
      foreignKey: 'book_id',
      through: 'list_books',
      as: 'lists'
    });
  }

}

var _default = Book;
exports.default = _default;