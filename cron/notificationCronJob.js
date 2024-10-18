// cronJobs.js
const cron = require('node-cron');
const Expense = require('../models/Expense');
const Budget = require('../models/Budget');
const Notification = require('../models/Notification');

const runCronJob = () => {
    cron.schedule('*/30 * * * * *', async () => {
        console.log('Checking budgets and expenses for the current month...');

        try {
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

            const budgets = await Budget.find({
                startDate: { $lte: endOfMonth },
                endDate: { $gte: startOfMonth }
            });

            for (const budget of budgets) {
                const { user, amount } = budget;

                const expenses = await Expense.find({
                    user: user,
                    createdAt: {
                        $gte: startOfMonth,
                        $lt: endOfMonth
                    }
                });

                const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);

                if (totalExpenses > amount) {
                    await Notification.create({
                        user: user,
                        message: `Your expenses for the month have exceeded the budget of ${amount}. Total expenses: ${totalExpenses}.`,
                        date: new Date()
                    });
                }
            }
        } catch (error) {
            console.error('Error checking budgets and expenses:', error);
        }
    });
};

module.exports = runCronJob;
