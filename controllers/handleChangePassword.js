const Users = require('../models/Users')

module.exports = async (req, res) => {
  const user = await Users.findById(req.session.auth._id)
  const result = await user.comparePassword(req.body.currentPassword)
  if (!result) {
    throw new Error('รหัสผ่านเดิมไม่ถูกต้อง')
  }
  user.password = req.body.newPassword
  await user.save()
  req.flash('message', 'รหัสผ่านของคุณได้รับการแก้ไขเสร็จสิ้น')
  return res.redirect('/edit-password')
}
