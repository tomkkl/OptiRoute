// routes/routeRoutes.js
const express = require('express');
const Route = require('../models/routeModel');

const router = express.Router();

router.get('/', async (req, res) => {
    // Retrieve all routes for a user
    try {
        const routes = await Route.find({}); // Assuming user authentication
        res.status(200).json(routes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// posts a new route
router.post('/', async (req, res) => {
  const {user_id, name, travelMode, waypoints} = req.body
  console.log("id: " + user_id);
  console.log("name: " + name);
  console.log("travelMode: " + travelMode);
  console.log("waypoints: " + waypoints);

  try {
    const routes = await Route.create({user_id, name, travelMode, waypoints});
    res.status(200).json(routes);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
})

router.updateRoute = async (req, res) => {
    // Update a route by ID
    try {
        const route = await Route.findByIdAndUpdate(req.params.name, req.body, { new: true });
        if (!route) {
            return res.status(404).json({ error: 'Route not found' });
        }
        res.status(200).json(route);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

router.delete('/:id', async (req, res) => {
    // Delete a route by ID
    try {
        const route = await Route.findByIdAndDelete(req.params.id);
        if (!route) {
            return res.status(404).json({ error: 'Route not found' });
        }
        res.status(200).json({ message: 'Route deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router