const mongoose = require('mongoose')

const Schema = mongoose.Schema

const notificationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: false
    },
    // onOff: {
    //     type: Boolean,
    //     required: true
    // },
    // darkMode: {
    //     type: Boolean,
    //     required: true
    // },
    // startDateTime: {
    //     type: Boolean, // not sure about type
    //     required: true
    // },
    // endDateTime: {
    //     type: Boolean, // not sure about type
    //     required: true
    // }, 
    // location: {
    //     type: String,
    //     required: true
    // },
    // description: {
    //     type: String,
    //     required: true
    // }
}, { timestamps: true })

module.exports = mongoose.model('Notification', notificationSchema)