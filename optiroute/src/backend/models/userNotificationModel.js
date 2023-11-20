const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SettingSchema = new Schema({
    notificationPhone: {
        type: Boolean,
        required: false
    },
    notificationEmail: {
        type: Boolean,
        required: false
    }

}, { timestamps: true });

module.exports = mongoose.model('NotificationSetting', SettingSchema);
