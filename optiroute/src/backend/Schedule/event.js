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
    // BEN WORK 
    const { query } = req.query;

    if (query) {
        // If there's a query parameter, search for events by title
        const matchedEvents = await Event.find({ title: new RegExp(query, 'i') }).sort({ createdAt: -1 });
        return res.status(200).json(matchedEvents);
    } else {
        // If no query parameter, return all events
        const events = await Event.find({}).sort({ createdAt: -1 });
        return res.status(200).json(events);
    }

    // BEN WORK
    
    /* this below here is the previous work that was here. keeping this incase my shit breaks everything */
    //const events = await Event.find({}).sort({ createdAt: -1 });
    //res.status(200).json(events);
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
    const {user_id ,title, start, end, recurrence , category, location, address, longitude, latitude, description, notification_time, startRecur, endRecur, colorID} = req.body;

    try {
        const event = await Event.create({user_id, title, start, end, recurrence, category, location, address, longitude, latitude, description, notification_time, startRecur, endRecur, colorID});
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
