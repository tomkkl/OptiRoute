const Notification = require('../models/userNotificationModel');

const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({}).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createNotification = async (req, res) => {
    const { user_id, phone, email, title, date_time, location, address, description, email_address } = req.body;
    try {
        const notification = await Notification.create({ user_id, phone, email, title, date_time, location, address, description, email_address });
        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateNotification = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedNotification = await Notification.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedNotification);
    } catch (error) {
        res.status(404).json({ error: 'Notification not found' });
    }
};

const deleteNotification = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedNotification = await Notification.findByIdAndDelete(id);
        res.status(200).json(deletedNotification);
    } catch (error) {
        res.status(404).json({ error: 'Notification not found' });
    }
};

module.exports = {
    getNotifications,
    createNotification,
    updateNotification,
    deleteNotification
};
