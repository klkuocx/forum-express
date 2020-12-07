const helpers = require('../_helpers')

module.exports = {
  authenticated: (req, res, next) => {
    if (helpers.ensureAuthenticated(req)) return next()
    res.redirect('/signin')
  },

  authenticatedAdmin: (req, res, next) => {
    if (helpers.ensureAuthenticated(req)) {
      if (helpers.getUser(req).isAdmin) return next()
      return res.redirect('/')
    }
    res.redirect('/signin')
  },

  authenticatedUser: (req, res, next) => {
    if (helpers.getUser(req).id === Number(req.params.id)) return next()
    return res.redirect('back')
  }
}