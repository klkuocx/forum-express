const express = require('express')
const router = express.Router()

const categoryController = require('../../../controllers/api/categoryController')

// admin interface - manage categories
router.get('/', categoryController.getCategories)

module.exports = router
