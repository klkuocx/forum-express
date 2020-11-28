const exphbs = require('express-handlebars')

module.exports = app => {
  // set view engine
  app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
  app.set('view engine', 'handlebars')

  const Hbs = exphbs.create({})

  // register new function
  Hbs.handlebars.registerHelper('ifSame', function (v1, operator, v2, options) {
    if (operator === '===')
      return (v1 === v2) ? options.fn(this) : options.inverse(this)
  })
}