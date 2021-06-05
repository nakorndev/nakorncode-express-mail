const Users = require('../models/Users')

module.exports = async (req, res) => {
  const user = await Users.findOneAndUpdate(
    { activateToken: req.params.token },
    { $unset: { activateToken: '' } }
  )
  if (!user) {
    throw new Error('ไม่พบรหัสการยืนยันที่อยู่อีเมลนี้')
  }
  // user.activateToken = null
  // await user.save()
  req.flash('message', `บัญชีของ ${user.email} ได้รับการเปิดใช้งานเรียบร้อย`)
  return res.redirect('/')
}
