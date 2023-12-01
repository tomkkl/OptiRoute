// models/routeModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const waypointSchema = new Schema({
  latitude: Number,
  longitude: Number,
  title: String, // Add a name field
  time: Date // Add a time field
}, { _id: false });

const routeSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        ref: 'User' // Replace with your user model reference if needed
    },
    name: {
        type: String, // Optional name for the route
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
