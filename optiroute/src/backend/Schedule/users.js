const express = require('express')
const User = require('../models/userModel')

const router = express.Router();

//This gets all users
router.get('/', (req, res) => {
    res.json({mssg: 'GET all users'})
})

//Get a single user
router.get('/:id', (req, res) => {
    res.json({mssg: 'Get single user'})
})

//Post a new user
router.post('/', async (req, res) => {
    const {name, email, password} = req.body

    try {
        const user = await User.create({name, email, password});
        res.status(200).json(user)
    } catch (error){
        res.status(400).json({error: error.message})
    }
})

//Delete a user
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a user'})
})


//Update a user
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a user'})
})


module.exports = router