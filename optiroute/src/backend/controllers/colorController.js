const Color = require('../models/colorModel');

const getColors = async (req, res) => {
    try {
        const colors = await Color.find({}).sort({ createdAt: -1 });
        res.status(200).json(colors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createColor = async (req, res) => {
    const { user_id, colorName, colorCode } = req.body;
    try {
        const color = await Color.create({ user_id, colorName, colorCode });
        res.status(201).json(color);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateColor = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedColor = await Color.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedColor);
    } catch (error) {
        res.status(404).json({ error: 'Color not found' });
    }
};

const deleteColor = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedColor = await Color.findByIdAndDelete(id);
        res.status(200).json(deletedColor);
    } catch (error) {
        res.status(404).json({ error: 'Color not found' });
    }
};

module.exports = {
    getColors,
    createColor,
    updateColor,
    deleteColor
};
