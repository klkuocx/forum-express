const express = require('express')
const router = express.Router()

const adminController = require('../../../controllers/api/adminController')

// admin interface - manage restaurants
router.get('/', adminController.getRestaurants)
router.get('/:id', adminController.getRestaurant)
router.delete('/:id', adminController.deleteRestaurant)

module.exports = router
