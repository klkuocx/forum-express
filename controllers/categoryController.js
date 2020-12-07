const db = require('../models')
const Category = db.Category

const categoryService = require('../services/categoryService')

const categoryController = {
  getCategories: (req, res) => {
    categoryService.getCategories(req, res, (data) => res.render('admin/categories', data))
  },

  postCategory: (req, res) => {
    const category = req.body
    if (!category.name) {
      req.flash('error_messages', 'name didn\'t exist')
      return res.redirect('back')
    }
    Category.create(category).then(category => {
      req.flash('success_messages', `category '${category.name}' was created successfully!`)
      res.redirect('/admin/categories')
    })
  },

  putCategory: (req, res) => {
    const { id } = req.params
    const update = req.body
    Category.findByPk(id).then(category => {
      category.update(update).then(category => {
        req.flash('success_messages', `category '${category.name}' was updated successfully!`)
        res.redirect('/admin/categories')
      })
    })
  },

  deleteCategory: (req, res) => {
    const { id } = req.params
    Category.findByPk(id).then(category => {
      category.destroy().then(category => {
        req.flash('success_messages', `category '${category.name}' was deleted successfully!`)
        res.redirect('/admin/categories')
      })
    })
  }
}

module.exports = categoryController
