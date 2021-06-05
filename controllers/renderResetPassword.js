const Users = require('../models/Users')

module.exports = async (req, res) => {
  const user = await Users.findOne({ resetToken: req.params.token })
  if (!user) {
    throw new Error('ไม่พบการขอรับรหัสผ่านใหม่')
  }
  return res.render('reset-password.pug', {
    email: user.email,
    token: user.resetToken
  })
}
