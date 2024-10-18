const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true,
            default: 0
        },
        description: {
            type: String,
        },
        category: {
            type: String,
            required: true 
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Expense", expenseSchema);