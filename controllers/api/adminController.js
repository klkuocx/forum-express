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
}

module.exports = adminController