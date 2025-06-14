const Expenses = require('../models/expenses');
const Users = require('../models/users');

Users.hasMany(Expenses);
Expenses.belongsTo(Users);

module.exports = {
    Expenses,
    Users
}