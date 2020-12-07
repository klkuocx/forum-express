const express = require('express')
const router = express.Router()

const adminController = require('../../../controllers/api/adminController')

const multer = require('multer')
const upload = multer({ dest: 'temp/' })

// admin interface - manage restaurants
router.get('/', adminController.getRestaurants)
router.get('/:id', adminController.getRestaurant)
router.post('/', upload.single('image'), adminController.postRestaurant)
router.put('/:id', upload.single('image'), adminController.putRestaurant)
router.delete('/:id', adminController.deleteRestaurant)

module.exports = router
