const express = require('express')
const router = express.Router()

const adminRestaurants = require('../routes/api/admin/restaurants')
const adminCategories = require('../routes/api/admin/categories')

// admin interface
router.get('/admin', (req, res) => res.redirect('/admin/restaurants'))
router.use('/admin/restaurants', adminRestaurants)
router.use('/admin/categories', adminCategories)

module.exports = router