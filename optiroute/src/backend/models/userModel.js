const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false
    },
    phonenumber: {
        type: String,
        required: false
    },
    image: {
        data: Buffer,
        contentType: String,
        required: true

    }

}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)