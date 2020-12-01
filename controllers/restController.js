const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category

const pageLimit = 10

const restController = {
  getRestaurants: (req, res) => {
    let offset = 0
    const whereQuery = {}
    let CategoryId = ''

    if (req.query.page) {
      offset = (req.query.page - 1) * pageLimit
    }
    if (req.query.CategoryId) {
      CategoryId = Number(req.query.CategoryId)
      whereQuery.CategoryId = CategoryId
    }

    Restaurant.findAndCountAll({
      raw: true,
      nest: true,
      include: Category,
      where: whereQuery,
      offset,
      limit: pageLimit
    }).then(result => {
      // data for pagination
      const page = Number(req.query.page) || 1
      const pages = Math.ceil(result.count / pageLimit)
      const totalPage = Array.from({ length: pages }).map((_, i) => i + 1)
      const prev = page - 1 < 1 ? 1 : page - 1
      const next = page + 1 > pages ? pages : page + 1

      // clean up restaurant data
      const data = result.rows.map(r => ({
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
          CategoryId,
          page,
          totalPage,
          prev,
          next
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
