const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
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
    recurrence  : {
        type: String,
        required: true
        
    },
    category: {
        type: String,
        
        // You can specify additional validation or constraints if needed
    },
    location: {
        type: String,
        required: true
        // You can specify additional validation or constraints if needed
    },
    description: {
        type: String,
        required: true
        // You can specify additional validation or constraints if needed
    }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
