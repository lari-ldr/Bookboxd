const {Model, DataTypes, Sequelize} = require('sequelize');

class Book extends Model{
    static init(connection){
        super.init({
              name: DataTypes.STRING,
              author: DataTypes.STRING,
              genre: DataTypes.STRING,
        }, {
            sequelize: connection,
            tableName: 'books',
        })
    }
    // a book has many reviews/ratings
    // but a review/rating belongs to only one book
    // one-to-many
    static associate(models){
        this.hasMany(models.Review, {foreignKey: 'book_id', as: 'reviews'})
        this.belongsToMany(models.List, { foreignKey: 'book_id', through: 'list_books', as: 'lists' })
    }
}

module.exports = Book;