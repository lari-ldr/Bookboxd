const {Model, DataTypes} = requre('sequelize');

class List extends Model{
    static init(connection){
        super.init({
            title: DataTypes.STRING
        }, {
            sequelize: connection,
            tableName: 'lists',
        })
    }
    static associate(models){
        this.belongsTo(models.User, {foreignKey: {name: 'user_id'}, as: 'users'})
        this.belongsToMany(models.Book, { foreignKey: 'list_id', through: 'list_books', as: 'books' })
    }
}

module.exports = List;