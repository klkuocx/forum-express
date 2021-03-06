const adminService = require('../../services/adminService')

const adminController = {
  // Manage Restaurants
  getRestaurants: (req, res) => {
    adminService.getRestaurants(req, res, (data) => res.json(data))
  },

  getRestaurant: (req, res) => {
    adminService.getRestaurant(req, res, (data) => res.json(data))
  },

  postRestaurant: (req, res) => {
    adminService.postRestaurant(req, res, (data) => res.json(data))
  },

  putRestaurant: (req, res) => {
    adminService.putRestaurant(req, res, (data) => res.json(data))
  },

  deleteRestaurant: (req, res) => {
    adminService.deleteRestaurant(req, res, (data) => res.json(data))
  }
}

module.exports = adminController