const {Sequelize,DataTypes} = require('sequelize');
const sequelize = require('../util/db-connection');

const Payments = sequelize.define('payment',{

    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
    },

    orderId : {
       type : DataTypes.STRING,
       allowNull : false
    },

    paymentSessionId : {
       type : DataTypes.STRING,
       allowNull : false
    },

    orderAmount : {
       type : DataTypes.INTEGER,
       allowNull : false
    },

    orderCurrency : {
        type : DataTypes.STRING,
        allowNull : false
    },

    paymentStatus : {
        type : DataTypes.STRING,
        allowNull : false
    },

    
})

module.exports = Payments;