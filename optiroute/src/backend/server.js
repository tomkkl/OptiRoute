require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const scheduleUsers = require('./Schedule/users')
const scheduleEvents =  require('./Schedule/event')

// create express app
const optiroute = express()

// middleware
optiroute.use(express.json())

optiroute.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//Users
optiroute.use('/apiM/users',scheduleUsers)

//Events
optiroute.use('/apiM/events',scheduleEvents)

//Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for port 4000
        optiroute.listen(4000, () => {
        console.log('connected to db and listening on port 4000!!')
        })
    })
    .catch((error) => {
        console.log(error)
    })