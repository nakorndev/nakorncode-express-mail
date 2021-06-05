module.exports = (req, res) => {
  delete req.session.auth
  req.flash('message', 'คุณได้ออกจากระบบเสร็จสิ้น')
  return res.redirect('/')
}
