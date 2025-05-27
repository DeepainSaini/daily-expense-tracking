const {Sequelize,DataTypes} = require('sequelize');
const sequelize = require('../util/db-connection');

const Expenses = sequelize.define('expense',{

    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
    },

    expense : {
       type : DataTypes.INTEGER,
       allowNull : false
    },

    description : {
       type : DataTypes.STRING,
       allowNull : false
    },

    category : {
       type : DataTypes.STRING,
       allowNull : false
    }
})

module.exports = Expenses;