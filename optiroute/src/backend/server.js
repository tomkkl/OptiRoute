require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const scheduleUsers = require('./Schedule/users')
const scheduleEvents = require('./Schedule/event')
const colorEvents = require('./Schedule/color')
const notificationEvents = require('./Schedule/userNotification')
const routes = require('./Schedule/route')



// create express app
const optiroute = express()

// middleware
optiroute.use(express.json())

optiroute.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//Users
optiroute.use('/api/users', scheduleUsers)

//Events
optiroute.use('/api/events', scheduleEvents)

//Colors
optiroute.use('/api/colors', colorEvents)

//Colors
optiroute.use('/api/NotificationSetting', notificationEvents)

//Route
optiroute.use('/api/routes', routes)


//Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for port
        optiroute.listen(process.env.PORT, () => {
            console.log('connected to db and listening on port 4000!!')
        })
    })
    .catch((error) => {
        console.log(error)
    })