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

module.exports = (app) => {
  // user interface
  app.get('/', authenticated, (req, res) => res.redirect('/restaurants'))
  app.use('/restaurants', authenticated, restaurants)
  app.use('/users', authenticated, users)
  app.use('/comments', authenticated, comments)
  app.use('/favorite', authenticated, favorite)
  app.use('/like', authenticated, like)
  app.use('/following', authenticated, following)

  // admin interface
  app.get('/admin', authenticatedAdmin, (req, res) => res.redirect('/admin/restaurants'))
  app.use('/admin/restaurants', authenticatedAdmin, adminRestaurants)
  app.use('/admin/users', authenticatedAdmin, adminUsers)
  app.use('/admin/categories', authenticatedAdmin, adminCategories)

  // signup & signin & logout
  app.get('/signup', userController.signUpPage)
  app.post('/signup', userController.signUp)
  app.get('/signin', userController.signInPage)
  app.post('/signin', userController.signIn)
  app.get('/logout', userController.logout)
}
