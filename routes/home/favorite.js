const express = require('express')
const router = express.Router()

const userController = require('../../controllers/userController')

// user interface - favorites
router.post('/:RestaurantId', userController.addFavorite)
router.delete('/:RestaurantId', userController.removeFavorite)

module.exports = router
