const Event = require('../models/eventModel');

const getEvents = async (req, res) => {
    try {
        const events = await Event.find({}).sort({ createdAt: -1 });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createEvent = async (req, res) => {
    const { title, start, end, recurrence  , category, location, description, notification_time } = req.body;
    try {
        const event = await Event.create({ title, start, end, recurrence  , category, location, description, notification_time });
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(404).json({ error: 'Event not found' });
    }
};

const deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedEvent = await Event.findByIdAndDelete(id);
        res.status(200).json(deletedEvent);
    } catch (error) {
        res.status(404).json({ error: 'Event not found' });
    }
};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
};
