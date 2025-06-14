const express = require('express');
const expenseController = require('../controllers/expenseController')
const userAuthentication = require('../middlewares/auth');
const router = express.Router();

router.get('/expense',expenseController.getExpensePage);
router.post('/expense',userAuthentication.authenticate,expenseController.addExpense);
router.get('/expense/data',userAuthentication.authenticate,expenseController.getExpenseData);
router.delete('/expense/:id',userAuthentication.authenticate,expenseController.deleteExpense);

module.exports = router;