const {Sequelize,DataTypes} = require('sequelize');
const sequelize = require('../util/db-connection');

const Users = sequelize.define('user',{

    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
    },

    name : {
       type : DataTypes.STRING,
       allowNull : false
    },

    email : {
       type : DataTypes.STRING,
       allowNull : false
    },

    password : {
       type : DataTypes.STRING,
       allowNull : false
    },

    isPremium: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
})

module.exports = Users;