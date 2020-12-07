const db = require('../../models')
const Restaurant = db.Restaurant
const Category = db.Category

const adminService = require('../../services/adminService')

const adminController = {
  // Manage Restaurants
  getRestaurants: (req, res) => {
    adminService.getRestaurants(req, res, (data) => res.json(data))
  },

  getRestaurant: (req, res) => {
    adminService.getRestaurant(req, res, (data) => res.json(data))
  },

  deleteRestaurant: (req, res) => {
    Restaurant.findByPk(req.params.id).then(restaurant => {
      restaurant.destroy().then(restaurant => {
        res.json({ status: 'success', message: `restaurant '${restaurant.name}' was deleted successfully!` })
      })
    })
  }
}

module.exports = adminController