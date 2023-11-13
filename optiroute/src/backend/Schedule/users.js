const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/userModel')
const {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser
} = require('../controllers/userController')

const router = express.Router();

//This gets all users
router.get('/', async (req, res) => {
    const users = await User.find({}).sort({createdAt: -1})
    
    res.status(200).json(users)
})

//Get a single user
router.get('/:id', async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such user'})
    }

    const user = await User.findById(id)

    if(!user) {
        return res.status(404).json({error: 'No such user'})
    } 

    res.status(200).json(user)
})

//Post a new user
router.post('/', async (req, res) => {
    const {name, email, phoneNumber, password, securityQuestion, friendList} = req.body
    console.log("THis is seciry:\n" + securityQuestion);

    try {
        const user = await User.create({name, email, phoneNumber, password, securityQuestion});
        res.status(200).json(user)
    } catch (error){
        res.status(400).json({error: error.message})
    }
})

//Delete a user
router.delete('/:id', async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such user'})
    }

    const user = await User.findOneAndDelete({_id: id})

    if(!user) {
        return res.status(404).json({error: 'No such user'})
    } 

    res.status(200).json(user)

})

//Update a user
router.patch('/:id', async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such user'})
    }

    const user = await User.findOneAndUpdate({_id: id} , {
        ...req.body
    })

    if(!user) {
        return res.status(404).json({error: 'No such user'})
    } 

    res.status(200).json(user)
})

module.exports = router

