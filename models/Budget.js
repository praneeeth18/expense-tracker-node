const mongoose = require('mongoose');

const BudgetSchema = mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true,
            default: 0
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    },
    {
        timestamps: true 
    }
);

module.exports = mongoose.model("Budget", BudgetSchema);