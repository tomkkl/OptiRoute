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
    friendList: {
        type: [String],
        default: [],
        required: false
    },
    friendRequestList: {
        type: [String],
        default: [],
        required: false
    },

}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)