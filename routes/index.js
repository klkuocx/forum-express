const restController = require('../controllers/restController.js')
const adminController = require('../controllers/adminController.js')
module.exports = (app) => {
  // user interface
  app.get('/', (req, res) => res.redirect('/restaurants'))
  app.get('/restaurants', restController.getRestaurants)

  // admin interface
  app.get('/admin', (req, res) => res.redirect('/admin/restaurants'))
  app.get('/admin/restaurants', adminController.getRestaurants)
}
