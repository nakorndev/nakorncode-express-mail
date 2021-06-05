const Users = require('../models/Users')

module.exports = async (req, res) => {
  const user = await Users.findOne({
    $or: [
      { username: req.body.usernameOrEmail },
      { email: req.body.usernameOrEmail }
    ]
  })
  if (!user) {
    throw new Error('การเข้าสู่ระบบไม่ถูกต้อง')
  }
  const result = await user.comparePassword(req.body.password)
  if (!result) {
    throw new Error('การเข้าสู่ระบบไม่ถูกต้อง')
  }
  if (user.activateToken) {
    throw new Error('กรุณาทำการยืนยันตัวตนผ่านทางอีเมลก่อนดำเนินการต่อ')
  }
  req.session.auth = user
  req.flash('message', 'คุณได้เข้าสู่ระบบเสร็จสิ้น')
  return res.redirect('/')
}
