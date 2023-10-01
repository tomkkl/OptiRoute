require('dotenv').config()
const express = require('express')

// create express app
const optiroute = express()

// middleware
optiroute.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

optiroute.get('/', (req, res) => {
    res.json({msg: "Welcome to the app"})
})

// listen for port
optiroute.listen(process.env.PORT, () => {
    console.log('listening on port 4000!!')
})