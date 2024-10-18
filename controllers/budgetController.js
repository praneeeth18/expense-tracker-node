const Budget = require('../models/Budget');
const User = require('../models/User');

const createBudget = async (req, res) => {
    const { amount, startDate, endDate, userId } = req.body;
    try {
        const newBudget = await Budget.create({
            amount,
            user: userId,
            startDate,
            endDate
        });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found!" });

        user.budgets.push(newBudget._id); 
        await user.save(); 

        res.status(201).json({ success: "Expense created and associated with the user!", Budget: newBudget });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 

const getBudgetsForCurrentUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const budgets = await Budget.find({ user: userId });

        if (!budgets || budgets.length === 0) {
            return res.status(404).json({ message: "No budgets found for the current user." });
        }

        res.status(200).json(budgets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createBudget,
    getBudgetsForCurrentUser
}