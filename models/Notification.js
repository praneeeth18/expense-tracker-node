const mongoose = require('mongoose');

const NotificationSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        message: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Notification', NotificationSchema);
