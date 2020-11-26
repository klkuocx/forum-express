const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

const userController = {
  signUpPage: (req, res) => res.render('signup'),

  signUp: (req, res) => {
    const { name, email, password, passwordCheck } = req.body
    if (password !== passwordCheck) {
      req.flash('error_messages', 'Password & Password Check is different!')
      return res.redirect('/signup')
    }

    User.findOne({ where: { email } }).then(user => {
      if (user) {
        req.flash('error_messages', `email: '${user.email}' has already existed!`)
        return res.redirect('/signup')
      }
      User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
      }).then(user => {
        req.flash('success_messages', `email: '${user.email}' is registered successfully!`)
        res.redirect('/signin')
      })
        .catch(err => console.error(err))
    })
  }
}

module.exports = userController
