const {Sequelize} = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
   process.env.DB_NAME,
   process.env.DB_USER, 
   process.env.DB_PASSWORD,
   {
       host: process.env.DB_HOST,
       dialect: process.env.DB_DIALECT
   }
);

(async () => {try{
   await sequelize.authenticate();
   console.log('connection to database is established successfully');
} catch(error){
   console.log(error);
}})();

module.exports = sequelize;


