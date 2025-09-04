const Expenses = require('../models/expenses');
const Users = require('../models/users');
const Payments = require('../models/payment');
const PasswordReq = require('../models/forgotPassRequests');
const FileUrl = require('../models/fileUrl');

Users.hasMany(Expenses);
Expenses.belongsTo(Users);

Users.hasMany(Payments);
Payments.belongsTo(Users);

Users.hasMany(PasswordReq);
PasswordReq.belongsTo(Users);

Users.hasMany(FileUrl);
FileUrl.belongsTo(Users);


module.exports = {
    Expenses,
    Users,
    Payments,
    FileUrl
}