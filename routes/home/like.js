const express = require('express')
const router = express.Router()

const userController = require('../../controllers/userController')

// user interface - likes
router.post('/:restaurantId', userController.like)
router.delete('/:restaurantId', userController.unlike)

module.exports = router
