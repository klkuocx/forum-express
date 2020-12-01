const db = require('../models')
const Comment = db.Comment

const commentController = {
  postComment: (req, res) => {
    const comment = req.body
    comment.UserId = req.user.id
    Comment.create(comment).then(comment => {
      req.flash('success_messages', `your comment was posted successfully!`)
      res.redirect(`/restaurants/${comment.RestaurantId}`)
    })
  }
}

module.exports = commentController