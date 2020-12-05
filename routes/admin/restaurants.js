const express = require('express')
const router = express.Router()

const adminController = require('../../controllers/adminController')

const multer = require('multer')
const upload = multer({ dest: 'temp/' })

// admin interface - manage restaurants
router.get('/', adminController.getRestaurants)
router.get('/create', adminController.createRestaurant)
router.post('/', upload.single('image'), adminController.postRestaurant)
router.get('/:id', adminController.getRestaurant)
router.get('/:id/edit', adminController.editRestaurant)
router.put('/:id', upload.single('image'), adminController.putRestaurant)
router.delete('/:id', adminController.deleteRestaurant)

module.exports = router
