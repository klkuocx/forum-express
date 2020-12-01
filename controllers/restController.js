const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category

const restController = {
  getRestaurants: (req, res) => {
    const whereQuery = {}
    let CategoryId = ''
    if (req.query.CategoryId) {
      CategoryId = Number(req.query.CategoryId)
      whereQuery.CategoryId = CategoryId
    }
    Restaurant.findAll({
      raw: true,
      nest: true,
      include: Category,
      where: whereQuery
    }).then(restaurants => {
      const data = restaurants.map(r => ({
        ...r,
        description: r.description.substring(0, 50)
      }))
      Category.findAll({
        raw: true,
        nest: true
      }).then(categories => {
        return res.render('restaurants', {
          restaurants: data,
          categories,
          CategoryId
        })
      })
    })
  },

  getRestaurant: (req, res) => {
    Restaurant.findByPk(req.params.id, {
      include: Category
    }).then(restaurant => {
      res.render('restaurant', { restaurant: restaurant.toJSON() })
    })
  }
}
module.exports = restController
