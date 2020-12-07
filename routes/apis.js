const express = require('express')
const router = express.Router()

const adminRestaurants = require('../routes/api/admin/restaurants')

// admin interface
router.get('/admin', (req, res) => res.redirect('/admin/restaurants'))
router.use('/admin/restaurants', adminRestaurants)

module.exports = router