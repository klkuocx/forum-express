const express = require('express')
const router = express.Router()

const userController = require('../../controllers/userController')

const { authenticatedUser } = require('../../middleware/auth')

const multer = require('multer')
const upload = multer({ dest: 'temp/' })

// user interface - top user
router.get('/top', userController.getTopUser)
// user interface - profile
router.get('/:id', userController.getUser)
router.get('/:id/edit', authenticatedUser, userController.editUser)
router.put('/:id', authenticatedUser, upload.single('image'), userController.putUser)

module.exports = router
