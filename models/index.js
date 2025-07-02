const Expenses = require('../models/expenses');
const Users = require('../models/users');
const Payments = require('../models/payment');

Users.hasMany(Expenses);
Expenses.belongsTo(Users);

Users.hasMany(Payments);
Payments.belongsTo(Users);


module.exports = {
    Expenses,
    Users,
    Payments
}