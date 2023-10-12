require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const scheduleUsers = require('./Schedule/users')

// create express app
const optiroute = express()

// middleware
optiroute.use(express.json())

optiroute.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//Users
optiroute.use('/api/users',scheduleUsers)

//Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for port
        optiroute.listen(process.env.PORT, () => {
        console.log('connected to db and listening on port: ', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

