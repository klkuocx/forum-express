const express = require('express')
const router = express.Router()

const categoryController = require('../../controllers/categoryController')

// admin interface - manage categories
router.get('/', categoryController.getCategories)
router.post('/', categoryController.postCategory)
router.get('/:id', categoryController.getCategories)
router.put('/:id', categoryController.putCategory)
router.delete('/:id', categoryController.deleteCategory)

module.exports = router
