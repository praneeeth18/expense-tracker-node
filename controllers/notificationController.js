const Notification = require('../models/Notification'); 

// Create a new notification
const createNotification = async (userId, message) => {
    try {
        const notification = await Notification.create({
            user: userId,
            message: message,
            date: new Date(),
        });
        return notification;
    } catch (error) {
        console.error('Error creating notification:', error);
        throw new Error('Failed to create notification');
    }
};

// Get all notifications for the current user
const getNotificationsForUser = async (req, res) => {
    const userId = req.params.userId; // Get user ID from the authenticated request

    try {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        const notifications = await Notification.find({
            user: userId,
            date: {
                $gte: startOfMonth,
                $lt: endOfMonth,
            },
        }).sort({ createdAt: -1 });

        if (!notifications || notifications.length === 0) {
            return res.status(404).json({ message: "No notifications found for this month." });
        }

        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a notification
const deleteNotification = async (req, res) => {
    const { id } = req.params; // Assume the notification ID is sent in the URL

    try {
        const deletedNotification = await Notification.findByIdAndDelete(id);

        if (!deletedNotification) {
            return res.status(404).json({ message: "Notification not found." });
        }

        res.status(200).json({ message: "Notification deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Optionally, you could add a method to clear all notifications for a user
const clearNotificationsForUser = async (req, res) => {
    const userId = req.userId;

    try {
        await Notification.deleteMany({ user: userId });
        res.status(200).json({ message: "All notifications cleared." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createNotification,
    getNotificationsForUser,
    deleteNotification,
    clearNotificationsForUser,
};
