const express = require('express');
const mongoose = require('mongoose');
const Notification = require('../models/userNotificationModel');
const {
    createNotification,
    getNotifications,
    deleteNotification,
    updateNotification
} = require('../controllers/userNotificationController');

const router = express.Router();

// Get all notifications
router.get('/', async (req, res) => {
    const { query } = req.query;

    if (query) {
        // If there's a query parameter, search for notifications by title
        const matchedNotifications = await Notification.find({ title: new RegExp(query, 'i') }).sort({ createdAt: -1 });
        return res.status(200).json(matchedNotifications);
    } else {
        // If no query parameter, return all notifications
        const notifications = await Notification.find({}).sort({ createdAt: -1 });
        return res.status(200).json(notifications);
    }
});


// Get a single notification
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such notification' });
    }

    const notification = await Notification.findById(id);

    if (!notification) {
        return res.status(404).json({ error: 'No such notification' });
    }

    res.status(200).json(notification);
});

// Create a new notification
router.post('/', async (req, res) => {
    const { user_id, phone, email, title, date_time, location, address, description, email_address, phone_address } = req.body;

    try {
        const notification = await Notification.create({ user_id, phone, email, title, date_time, location, address, description, email_address, phone_address });
        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete an notification
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such notification' });
    }

    const notification = await Notification.findOneAndDelete({ _id: id });

    if (!notification) {
        return res.status(404).json({ error: 'No such notification' });
    }

    res.status(200).json(notification);
});

// Update an notification
router.patch('/:id', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such notification' });
    }

    const notification = await Notification.findOneAndUpdate({ _id: id }, req.body, { new: true });

    if (!notification) {
        return res.status(404).json({ error: 'No such notification' });
    }

    res.status(200).json(notification);
});

module.exports = router;
