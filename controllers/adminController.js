const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const db = require('../models')
const Restaurant = db.Restaurant
const User = db.User
const Category = db.Category

const adminService = require('../services/adminService')

const adminController = {
  // Manage Restaurants
  getRestaurants: (req, res) => {
    adminService.getRestaurants(req, res, (data) => res.render('admin/restaurants', data))
  },

  createRestaurant: (req, res) => {
    Category.findAll({ raw: true, nest: true }).then(categories => {
      res.render('admin/create', { categories })
    })
  },

  postRestaurant: (req, res) => {
    adminService.postRestaurant(req, res, (data) => {
      if (data.status === 'error') {
        req.flash('error_messages', data.message)
        return res.redirect('back')
      }
      req.flash('success_messages', data.message)
      return res.redirect('/admin/restaurants')
    })
  },

  getRestaurant: (req, res) => {
    adminService.getRestaurant(req, res, (data) => res.render('admin/restaurant', data))
  },

  editRestaurant: (req, res) => {
    Category.findAll({ raw: true, nest: true }).then(categories => {
      Restaurant.findByPk(req.params.id).then(restaurant => {
        res.render('admin/create', { restaurant: restaurant.toJSON(), categories })
      })
    })
  },

  putRestaurant: (req, res) => {
    adminService.putRestaurant(req, res, (data) => {
      if (data.status === 'error') {
        req.flash('error_messages', data.message)
        return res.redirect('back')
      }
      req.flash('success_messages', data.message)
      return res.redirect('/admin/restaurants')
    })
  },

  deleteRestaurant: (req, res) => {
    adminService.deleteRestaurant(req, res, (data) => {
      if (data.status === 'success') {
        req.flash('success_messages', data.message)
        res.redirect('/admin/restaurants')
      }
    })
  },

  // Manage Users
  getUsers: (req, res) => {
    User.findAll({ raw: true }).then(users => {
      res.render('admin/users', { users })
    })
  },

  putUsers: (req, res) => {
    User.findByPk(req.params.id).then(user => {
      console.log('user.isAdmin_before:', user.isAdmin)
      user.isAdmin = !user.isAdmin
      console.log('user.isAdmin_after:', user.isAdmin)
      user.save().then(user => {
        req.flash('success_messages', `user '${user.name}' was updated successfully!`)
        res.redirect('/admin/users')
      })
    })
  }
}
module.exports = adminController
