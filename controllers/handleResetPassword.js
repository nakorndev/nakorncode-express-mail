const Users = require('../models/Users')

module.exports = async (req, res) => {
  const user = await Users.findOne({ resetToken: req.params.token })
  if (!user) {
    throw new Error('ไม่พบการขอรับรหัสผ่านใหม่')
  }
  user.password = req.body.password
  user.resetToken = undefined
  await user.save()
  req.flash('message', 'รหัสผ่านของคุณได้รับการเปลี่ยนใหม่เสร็จสิ้น')
  return res.redirect('/')
}
