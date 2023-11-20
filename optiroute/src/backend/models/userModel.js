const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    securityQuestion: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false
    },
    notificationPhone: {
        type: Boolean,
        required: false
    },
    notificationEmail: {
        type: Boolean,
        required: false
    },
    notification_phone_number: {
        type: String,
        required: false
    },
    notification_email_address: {
        type: String,
        required: false
    },
    notification_phone_content: {
        type: String,
        required: false
    },
    notification_email_content: {
        type: String,
        required: false
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)