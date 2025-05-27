const express = require('express');
const expenseController = require('../controllers/expenseController')
const router = express.Router();

router.get('/expense',expenseController.getExpensePage);
router.post('/expense',expenseController.addExpense);
router.get('/expense/data',expenseController.getExpenseData);
router.delete('/expense/:id',expenseController.deleteExpense);

module.exports = router;