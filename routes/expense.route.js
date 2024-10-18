const express = require('express');
const router = express.Router();
const { getAllExpenses, createExpense, getExpensesByUser} = require('../controllers/expenseController');

router.get('/', getAllExpenses);
router.post('/', createExpense);
router.get('/getExpensesByUser/:userId', getExpensesByUser);

module.exports = router;