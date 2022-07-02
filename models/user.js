'use strict';
const {
  Model
} = require('sequelize');
const { hashing } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Article, {foreignKey: 'userId'})
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Enter a valid email address"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [5,15],
        notEmpty: true
      }
    },
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user, opt){
        const hashPassword = hashing(user.password)
        user.password = hashPassword
      },
      beforeBulkCreate(user, opt){
        const hashPassword = hashing(user.password)
        user.password = hashPassword
      }
    }
  });
  return User;
};
