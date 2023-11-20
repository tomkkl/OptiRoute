const express = require('express');
const mongoose = require('mongoose');
const UserNotification = require('../models/userNotificationModel');
const {
    createUserNotification,
    getUserNotifications,
    getUserNotification,
    deleteUserNotification,
    updateUserNotification
} = require('../controllers/userNotificationController');

const router = express.Router();

// Get all userNotifications
router.get('/', async (req, res) => {
    // BEN WORK 
    const { query } = req.query;

    if (query) {
        // If there's a query parameter, search for userNotifications by title
        const matchedUserNotifications = await UserNotification.find({ title: new RegExp(query, 'i') }).sort({ createdAt: -1 });
        return res.status(200).json(matchedUserNotifications);
    } else {
        // If no query parameter, return all userNotifications
        const userNotifications = await UserNotification.find({}).sort({ createdAt: -1 });
        return res.status(200).json(userNotifications);
    }

    // BEN WORK

    /* this below here is the previous work that was here. keeping this incase my shit breaks everything */
    //const userNotifications = await UserNotification.find({}).sort({ createdAt: -1 });
    //res.status(200).json(userNotifications);
});


// Get a single userNotification
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such userNotification' });
    }

    const userNotification = await UserNotification.findById(id);

    if (!userNotification) {
        return res.status(404).json({ error: 'No such userNotification' });
    }

    res.status(200).json(userNotification);
});

// Create a new userNotification
router.post('/', async (req, res) => {
    const { notificationPhone, notificationEmail } = req.body;

    try {
        const userNotification = await UserNotification.create({ notificationPhone, notificationEmail });
        res.status(201).json(userNotification);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete an userNotification
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such userNotification' });
    }

    const userNotification = await UserNotification.findOneAndDelete({ _id: id });

    if (!userNotification) {
        return res.status(404).json({ error: 'No such userNotification' });
    }

    res.status(200).json(userNotification);
});

// Update an userNotification
router.patch('/:id', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such userNotification' });
    }

    const userNotification = await UserNotification.findOneAndUpdate({ _id: id }, req.body, { new: true });

    if (!userNotification) {
        return res.status(404).json({ error: 'No such userNotification' });
    }

    res.status(200).json(userNotification);
});

module.exports = router;
