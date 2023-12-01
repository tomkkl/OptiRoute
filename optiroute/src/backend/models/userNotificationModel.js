const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SettingSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    phone: {
        type: Boolean,
        required: true
    },
    email: {
        type: Boolean,
        required: true
    },
    title: {
        type: Boolean,
        required: true
    },
    date_time: {
        type: Boolean,
        required: true
    },
    location: {
        type: Boolean,
        required: true
    },
    address: {
        type: Boolean,
        required: true
    },
    description: {
        type: Boolean,
        required: true
    },
    email_address: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('NotificationSetting', SettingSchema);
