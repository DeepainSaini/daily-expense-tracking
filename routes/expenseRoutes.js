const express = require('express');
const expenseController = require('../controllers/expenseController')
const userAuthentication = require('../middlewares/auth');
const router = express.Router();

router.get('/expense',userAuthentication.authenticate,expenseController.getExpensePage);
router.post('/expense',userAuthentication.authenticate,expenseController.addExpense);
router.get('/expense/data',userAuthentication.authenticate,expenseController.getExpenseData);
router.delete('/expense/:id',userAuthentication.authenticate,expenseController.deleteExpense);
router.get('/expense/fileUrls',userAuthentication.authenticate,expenseController.getFileUrls);

module.exports = router;