const db = require('../models')
const Category = db.Category

const categoryService = require('../services/categoryService')

const categoryController = {
  getCategories: (req, res) => {
    categoryService.getCategories(req, res, (data) => res.render('admin/categories', data))
  },

  postCategory: (req, res) => {
    categoryService.postCategory(req, res, (data) => {
      if (data.status === 'error') {
        req.flash('error_messages', data.message)
        return res.redirect('back')
      }
      req.flash('success_messages', data.message)
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
