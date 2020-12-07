const express = require('express')
const router = express.Router()

// include routers
const restaurants = require('./home/restaurants')
const users = require('./home/users')
const comments = require('./home/comments')
const favorite = require('./home/favorite')
const like = require('./home/like')
const following = require('./home/following')
const adminRestaurants = require('./admin/restaurants')
const adminUsers = require('./admin/users')
const adminCategories = require('./admin/categories')

const userController = require('../controllers/userController.js')

const { authenticated } = require('../middleware/auth')
const { authenticatedAdmin } = require('../middleware/auth')

// user interface
router.get('/', authenticated, (req, res) => res.redirect('/restaurants'))
router.use('/restaurants', authenticated, restaurants)
router.use('/users', authenticated, users)
router.use('/comments', authenticated, comments)
router.use('/favorite', authenticated, favorite)
router.use('/like', authenticated, like)
router.use('/following', authenticated, following)

// admin interface
router.get('/admin', authenticatedAdmin, (req, res) => res.redirect('/admin/restaurants'))
router.use('/admin/restaurants', authenticatedAdmin, adminRestaurants)
router.use('/admin/users', authenticatedAdmin, adminUsers)
router.use('/admin/categories', authenticatedAdmin, adminCategories)

// signup & signin & logout
router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/signin', userController.signInPage)
router.post('/signin', userController.signIn)
router.get('/logout', userController.logout)

module.exports = router
