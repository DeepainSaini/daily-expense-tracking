const {Sequelize,DataTypes} = require('sequelize');
const sequelize = require('../util/db-connection');

const FileUrls = sequelize.define('fileurls',{

    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
    },

    fileurl : {
       type : DataTypes.STRING,
       allowNull : false
    },

})

module.exports = FileUrls;