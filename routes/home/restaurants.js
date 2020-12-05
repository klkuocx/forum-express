const express = require('express')
const router = express.Router()

const restController = require('../../controllers/restController')

// user interface - index
router.get('/', restController.getRestaurants)
router.get('/top', restController.getTop10Rest)
router.get('/feeds', restController.getFeeds)
router.get('/:id', restController.getRestaurant)
router.get('/:id/dashboard', restController.getDashboard)

module.exports = router
