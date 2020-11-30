const db = require('../models')
const Category = db.Category

const categoryController = {
  getCategories: (req, res) => {
    Category.findAll({ raw: true, nest: true }).then(categories => {
      res.render('admin/categories', { categories })
    })
  },

  postCategory: (req, res) => {
    const category = req.body
    Category.create(category).then(() => res.redirect('/admin/categories'))
  }
}

module.exports = categoryController
