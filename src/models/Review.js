import {Model, DataTypes} from 'sequelize';

class Review extends Model{
    static init(connection){
        super.init({
            critique: DataTypes.STRING,
            rating: DataTypes.NUMBER,
        }, {
            sequelize: connection,
            tableName: 'reviews',
        })
    }
    // a book/user has many reviews/ratings
    // but a review/rating belongs to only one book/user
    // one-to-many
    static associate(models){
        this.belongsTo(models.Book, {foreignKey: 'book_id', as: 'books', onDelete: 'CASCADE'})
        this.belongsTo(models.User, {foreignKey: 'user_id', as: 'users', onDelete: 'CASCADE'})
    }
}

export default Review;