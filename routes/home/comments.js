const express = require('express')
const router = express.Router()

const commentController = require('../../controllers/commentController')

const { authenticatedAdmin } = require('../../middleware/auth')

// user interface - comments
router.post('/', commentController.postComment)
router.delete('/:id', authenticatedAdmin, commentController.deleteComment)

module.exports = router
