const fs = require('fs')

const db = require('../models')
const Restaurant = db.Restaurant

const adminController = {
  getRestaurants: (req, res) => {
    Restaurant.findAll({ raw: true }).then(restaurants => {
      res.render('admin/restaurants', { restaurants })
    })
  },

  createRestaurant: (req, res) => {
    res.render('admin/create')
  },

  postRestaurant: (req, res) => {
    const restaurant = req.body
    const { file } = req
    if (!restaurant.name) {
      req.flash('error_messages', "name field is required.")
      return res.redirect('back')
    }

    if (file) {
      fs.readFile(file.path, (err, data) => {
        if (err) console.log('Error: ', err)
        fs.writeFile(`upload/${file.originalname}`, data, () => {
          restaurant.image = file ? `/upload/${file.originalname}` : null
          return Restaurant.create(restaurant).then(restaurant => {
            req.flash('success_messages', `restaurant '${restaurant.name}' was created successfully!`)
            res.redirect('/admin/restaurants')
          })
        })
      })
    } else {
      restaurant.image = null
      return Restaurant.create(restaurant).then(restaurant => {
        req.flash('success_messages', `restaurant '${restaurant.name}' was created successfully!`)
        res.redirect('/admin/restaurants')
      })
    }
  },

  getRestaurant: (req, res) => {
    Restaurant.findByPk(req.params.id).then(restaurant => {
      res.render('admin/restaurant', { restaurant: restaurant.toJSON() })
    })
  },

  editRestaurant: (req, res) => {
    Restaurant.findByPk(req.params.id).then(restaurant => {
      res.render('admin/create', { restaurant: restaurant.toJSON() })
    })
  },

  putRestaurant: (req, res) => {
    const update = req.body
    const { file } = req
    if (!update.name) {
      req.flash('error_messages', "name field is required.")
      return res.redirect('back')
    }

    if (file) {
      fs.readFile(file.path, (err, data) => {
        if (err) console.log('Error: ', err)
        fs.writeFile(`upload/${file.originalname}`, data, () => {
          return Restaurant.findByPk(req.params.id).then(restaurant => {
            update.image = file ? `/upload/${file.originalname}` : restaurant.image
            restaurant.update(update).then(restaurant => {
              req.flash('success_messages', `restaurant '${restaurant.name}' was updated successfully!`)
              res.redirect('/admin/restaurants')
            })
          })
        })
      })
    } else {
      Restaurant.findByPk(req.params.id).then(restaurant => {
        update.image = restaurant.image
        restaurant.update(update).then(restaurant => {
          req.flash('success_messages', `restaurant '${restaurant.name}' was updated successfully!`)
          res.redirect('/admin/restaurants')
        })
      })
    }
  },

  deleteRestaurant: (req, res) => {
    Restaurant.findByPk(req.params.id).then(restaurant => {
      restaurant.destroy().then(restaurant => {
        req.flash('success_messages', `restaurant '${restaurant.name}' was deleted successfully!`)
        res.redirect('/admin/restaurants')
      })
    })
  }
}
module.exports = adminController
