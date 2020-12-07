const express = require('express')
const router = express.Router()

const categoryController = require('../../../controllers/api/categoryController')

// admin interface - manage categories
router.get('/', categoryController.getCategories)
router.post('/', categoryController.postCategory)
router.put('/:id', categoryController.putCategory)

module.exports = router
