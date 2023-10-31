const express = require('express')

const {
    getNotifications,
    getNotification,
    createNotification,
    deleteNotification,
    updateNotification
} = require('../controllers/notificationController')

const router = express.Router()

// GET all notifications
router.get('/', getNotifications)

// GET a single notification
router.get('/:id', getNotification)

// POST a new notification
router.post('/', createNotification)

// DELETE a workout
router.delete('/:id', deleteNotification)

// UPDATE a workout
router.patch('/:id', updateNotification)


module.exports = router












