const mongoose = require('mongoose')

const Schema = mongoose.Schema

const notificationSchema = new Schema({
    onOff: {
        type: Boolean,
        required: true
    },
    darkMode: {
        type: Boolean,
        required: true
    },
    startDateTime: {
        type: Boolean,
        required: true
    },
    endDateTime: {
        type: Boolean,
        required: true
    },
    location: {
        type: Boolean,
        required: true
    },
    description: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Notification', notificationSchema)