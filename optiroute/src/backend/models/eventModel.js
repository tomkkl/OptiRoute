const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    user_id:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    notification_time: {
        type: Date,
        required: true
    },
    recurrence  : {
        type: String,
        required: true
    },
    category: {
        type: String,
    },
    location: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startRecur: {
        type: Date,
    },
    endRecur: {
        type: Date,
    }, 
    colorID: {
        type: String,
    }, 
    travelTime: {
        type: Number,
    },
    leaveTime: {
        type: Date,
    }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);