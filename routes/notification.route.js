const express = require('express');
const {
    createNotification,
    getNotificationsForUser,
    deleteNotification,
    clearNotificationsForUser
} = require('../controllers/notificationController');
const router = express.Router();

// Route to get notifications for the current user
router.get('/:userId', getNotificationsForUser);

// Route to delete a specific notification
router.delete('/:id', deleteNotification);

// Route to clear all notifications for the user
router.delete('/', clearNotificationsForUser);

// You can call createNotification from another route or use it in your cron job
module.exports = router;
