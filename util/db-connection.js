const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('testdb','root','964999',{
    host : "localhost",
    dialect : "mysql"
});

(async () => {try{
   await sequelize.authenticate();
   console.log('connection to database is established successfully');
} catch(error){
   console.log(error);
}})();

module.exports = sequelize;


