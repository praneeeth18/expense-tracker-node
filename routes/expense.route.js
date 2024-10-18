const express = require('express');
const router = express.Router();
const { getAllExpenses, createExpense, getExpensesByUser} = require('../controllers/expenseController');

router.get('/', getAllExpenses);
router.post('/', createExpense);
router.post('/getExpensesByUser', getExpensesByUser);

module.exports = router;