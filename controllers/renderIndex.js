module.exports = (req, res) => {
  return res.render('index.pug', {
    auth: req.session.auth,
    message: req.flash('message')
  })
}
