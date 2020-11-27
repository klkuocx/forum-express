const db = require('../models')
const Restaurant = db.Restaurant

const adminController = {
  getRestaurants: (req, res) => {
    Restaurant.findAll({ raw: true }).then(restaurants => {
      res.render('admin/restaurants', { restaurants })
    })
  },

  createRestaurant: (req, res) => {
    res.render('admin/create')
  },

  postRestaurant: (req, res) => {
    const restaurant = req.body
    if (!restaurant.name) {
      req.flash('error_messages', "name field is required.")
      return res.redirect('back')
    }
    Restaurant.create(restaurant).then(restaurant => {
      req.flash('success_messages', `restaurant '${restaurant.name}' was created successfully!`)
      res.redirect('/admin/restaurants')
    })
  }
}
module.exports = adminController
