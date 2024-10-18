const express = require('express');
const { createBudget, getBudgetsForCurrentUser } = require('../controllers/budgetController');
const router = express.Router();

router.post('/', createBudget);
router.get('/getBudgetForCurrentUser/:userId', getBudgetsForCurrentUser);

module.exports = router;
