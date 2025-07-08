const {Sequelize,DataTypes} = require('sequelize');
const sequelize = require('../util/db-connection');

const PasswordReq = sequelize.define('passswordReq',{

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      isactive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      }
})

module.exports = PasswordReq;