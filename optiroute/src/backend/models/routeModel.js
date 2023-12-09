// models/routeModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const waypointSchema = new Schema({
  latitude: Number,
  longitude: Number,
  title: String,
  time: Date
}, { _id: false });

const routeSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        default: 'Unnamed Route'
    },
    travelMode: {
        type: String,
        required: true,
        enum: ['DRIVING', 'WALKING', 'BICYCLING']
    },
    waypoints: [waypointSchema]
}, { timestamps: true });

module.exports = mongoose.model('Route', routeSchema);
