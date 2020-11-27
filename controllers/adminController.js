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
  },

  getRestaurant: (req, res) => {
    Restaurant.findByPk(req.params.id).then(restaurant => {
      res.render('admin/restaurant', { restaurant: restaurant.toJSON() })
    })
  },

  editRestaurant: (req, res) => {
    Restaurant.findByPk(req.params.id).then(restaurant => {
      res.render('admin/create', { restaurant: restaurant.toJSON() })
    })
  },

  putRestaurant: (req, res) => {
    const update = req.body
    if (!update.name) {
      req.flash('error_messages', "name field is required.")
      return res.redirect('back')
    }
    Restaurant.findByPk(req.params.id).then(restaurant => {
      restaurant.update(update).then(restaurant => {
        req.flash('success_messages', `restaurant '${restaurant.name}' was updated successfully!`)
        res.redirect('/admin/restaurants')
      })
    })
  },

  deleteRestaurant: (req, res) => {
    Restaurant.findByPk(req.params.id).then(restaurant => {
      restaurant.destroy().then(restaurant => {
        req.flash('success_messages', `restaurant '${restaurant.name}' was deleted successfully!`)
        res.redirect('/admin/restaurants')
      })
    })
  }
}
module.exports = adminController
