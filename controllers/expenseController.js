const Expense = require('../models/Expense');
const User = require('../models/User');

const createExpense = async (req, res) => {
    const { amount, description, category, userId } = req.body;

    if (!amount || !category) return res.status(400).json({ message: "Amount and category are required!"});

    if (!userId) return res.status(400).json({ message: "User details are missing!"});

    try {
        const newExpense = await Expense.create({
            amount,
            description,
            category,
            user: userId 
        });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found!" });

        user.expenses.push(newExpense._id); 
        await user.save(); 

        res.status(201).json({ success: "Expense created and associated with the user!", expense: newExpense });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        if (!expenses) return res.status(404).json({ message: "No expenses found!"})
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getExpensesByUser = async (req, res) => {
    // const { userId } = req.body;
    const userId = req.params.userId;
    try {
        // Find all expenses for the currently logged-in user
        const expenses = await Expense.find({ user: userId });
        
        if (!expenses || expenses.length === 0) {
            return res.status(404).json({ message: "No expenses found for the current user." });
        }

        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createExpense,
    getAllExpenses,
    getExpensesByUser
}