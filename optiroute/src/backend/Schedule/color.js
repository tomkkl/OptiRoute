const express = require('express');
const mongoose = require('mongoose');
const Color = require('../models/colorModel');
const {
    createColor,
    getColors,
    getColor,
    deleteColor,
    updateColor
} = require('../controllers/colorController');

const router = express.Router();

// Get all colors
router.get('/', async (req, res) => {
    // BEN WORK 
    const { query } = req.query;

    if (query) {
        // If there's a query parameter, search for colors by title
        const matchedColors = await Color.find({ title: new RegExp(query, 'i') }).sort({ createdAt: -1 });
        return res.status(200).json(matchedColors);
    } else {
        // If no query parameter, return all colors
        const colors = await Color.find({}).sort({ createdAt: -1 });
        return res.status(200).json(colors);
    }

    // BEN WORK

    /* this below here is the previous work that was here. keeping this incase my shit breaks everything */
    //const colors = await Color.find({}).sort({ createdAt: -1 });
    //res.status(200).json(colors);
});


// Get a single color
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such color' });
    }

    const color = await Color.findById(id);

    if (!color) {
        return res.status(404).json({ error: 'No such color' });
    }

    res.status(200).json(color);
});

// Create a new color
router.post('/', async (req, res) => {
    const { user_id, colorName, colorCode } = req.body;

    try {
        const color = await Color.create({ user_id, colorName, colorCode });
        res.status(201).json(color);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete an color
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such color' });
    }

    const color = await Color.findOneAndDelete({ _id: id });

    if (!color) {
        return res.status(404).json({ error: 'No such color' });
    }

    res.status(200).json(color);
});

// Update an color
router.patch('/:id', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such color' });
    }

    const color = await Color.findOneAndUpdate({ _id: id }, req.body, { new: true });

    if (!color) {
        return res.status(404).json({ error: 'No such color' });
    }

    res.status(200).json(color);
});

module.exports = router;
