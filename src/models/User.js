import { Model, DataTypes } from 'sequelize';

class User extends Model {
  static init(connection) {
    super.init(
      {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        username: DataTypes.STRING,
        email: DataTypes.STRING,
      },
      {
        sequelize: connection,
        tableName: 'users',
      }
    );
  }
  // a user has many reviews/ratings
  // but a review/rating belongs to only one user
  // one-to-many
  static associate(models) {
    this.hasMany(models.List, {
      foreignKey: { name: 'list_id' },
      as: 'lists',
      onDelete: 'CASCADE',
    });
    this.hasMany(models.Review, {
      foreignKey: 'user_id',
      as: 'reviews',
      onDelete: 'CASCADE',
    });
  }
}

export default User;
