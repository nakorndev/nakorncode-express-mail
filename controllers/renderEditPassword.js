module.exports = (req, res) => {
  return res.render('edit-password.pug', {
    message: req.flash('message')
  })
}
