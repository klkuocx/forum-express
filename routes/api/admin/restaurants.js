const express = require('express')
const router = express.Router()

const adminController = require('../../../controllers/api/adminController')

// admin interface - manage restaurants
router.get('/', adminController.getRestaurants)

module.exports = router
