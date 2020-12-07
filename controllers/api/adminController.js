const db = require('../../models')
const Restaurant = db.Restaurant
const Category = db.Category

const adminController = {
  // Manage Restaurants
  getRestaurants: (req, res) => {
    Restaurant.findAll({
      raw: true,
      nest: true,
      include: [Category]
    }).then(restaurants => {
      res.json({ restaurants })
    })
  },
}

module.exports = adminController