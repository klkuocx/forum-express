const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const db = require('../models')
const Restaurant = db.Restaurant
const User = db.User
const Category = db.Category

const adminService = {
  // Manage Restaurants
  getRestaurants: (req, res, callback) => {
    Restaurant.findAll({
      raw: true,
      nest: true,
      include: [Category]
    }).then(restaurants => callback({ restaurants }))
  },

  getRestaurant: (req, res, callback) => {
    Restaurant.findByPk(req.params.id, { include: [Category] }).then(restaurant =>
      callback({ restaurant: restaurant.toJSON() })
    )
  },

  postRestaurant: (req, res, callback) => {
    const restaurant = req.body
    const { file } = req
    if (!restaurant.name) {
      callback({ status: 'error', message: 'name field is required.' })
    }

    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, (err, img) => {
        if (err) console.log('Error: ', err)
        restaurant.image = file ? img.data.link : null
        return Restaurant.create(restaurant).then(restaurant => {
          callback({ status: 'success', message: `restaurant '${restaurant.name}' was created successfully!` })
        })
      })
    } else {
      restaurant.image = null
      return Restaurant.create(restaurant).then(restaurant => {
        callback({ status: 'success', message: `restaurant '${restaurant.name}' was created successfully!` })
      })
    }
  },

  deleteRestaurant: (req, res, callback) => {
    Restaurant.findByPk(req.params.id).then(restaurant => {
      restaurant.destroy().then(restaurant => {
        callback({ status: 'success', message: `restaurant '${restaurant.name}' was deleted successfully!` })
      })
    })
  }
}

module.exports = adminService
