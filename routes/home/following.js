const express = require('express')
const router = express.Router()

const userController = require('../../controllers/userController')

// user interface - followship
router.post('/:userId', userController.follow)
router.delete('/:userId', userController.unfollow)

module.exports = router
