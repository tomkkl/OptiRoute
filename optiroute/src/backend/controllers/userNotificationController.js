const Setting = require('../models/userNotificationModel'); r

const getSettings = async (req, res) => {
    try {
        const Settings = await Setting.find({}).sort({ createdAt: -1 });
        res.status(200).json(Settings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const creatSetting = async (req, res) => {
    const { emailSetting, phoneSetting } = req.body;
    try {
        const setting = await Setting.create({ emailSetting, phoneSetting });
        res.status(201).json(setting);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateSetting = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedSetting = await Setting.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedSetting);
    } catch (error) {
        res.status(404).json({ error: ' not found' });
    }
};

const deleteSetting = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSetting = await Setting.findByIdAndDelete(id);
        res.status(200).json(deletedSetting);
    } catch (error) {
        res.status(404).json({ error: ' not found' });
    }
};

module.exports = {
    getSettings,
    creatSetting,
    updateSetting,
    deleteSetting
};
