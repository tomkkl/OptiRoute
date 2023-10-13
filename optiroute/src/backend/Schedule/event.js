const express = require('express');
const mongoose = require('mongoose');
const Event = require('../models/eventModel');
const {
    createEvent,
    getEvents,
    getEvent,
    deleteEvent,
    updateEvent
} = require('../controllers/eventController');

const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
    const events = await Event.find({}).sort({ createdAt: -1 });
    res.status(200).json(events);
});

// Get a single event
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such event' });
    }

    const event = await Event.findById(id);

    if (!event) {
        return res.status(404).json({ error: 'No such event' });
    }

    res.status(200).json(event);
});

// Create a new event
router.post('/', async (req, res) => {
    const { title, start, end, recurrence , category, location, description } = req.body;

    try {
        const event = await Event.create({ title, start, end, recurrence  , category, location, description });
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete an event
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such event' });
    }

    const event = await Event.findOneAndDelete({ _id: id });

    if (!event) {
        return res.status(404).json({ error: 'No such event' });
    }

    res.status(200).json(event);
});

// Update an event
router.patch('/:id', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such event' });
    }

    const event = await Event.findOneAndUpdate({ _id: id }, req.body, { new: true });

    if (!event) {
        return res.status(404).json({ error: 'No such event' });
    }

    res.status(200).json(event);
});

module.exports = router;
