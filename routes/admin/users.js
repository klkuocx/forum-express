const express = require('express')
const router = express.Router()

const adminController = require('../../controllers/adminController')

// admin interface - manage users
router.get('/', adminController.getUsers)
router.put('/:id/toggleAdmin', adminController.putUsers)

module.exports = router
