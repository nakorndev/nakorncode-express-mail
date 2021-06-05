const { v4: uuid } = require('uuid')
const Users = require('../models/Users')
const sendMail = require('../utils/sendMail')

module.exports = async (req, res) => {
  const user = await Users.findOne({ email: req.body.email })
  if (!user) {
    throw new Error('ไม่พบผู้ใช้งาน')
  }
  const token = uuid()
  user.resetToken = token
  await user.save()
  const testSendMailUrl = await sendMail({
    from: '"Admin" <admin@example.com>',
    to: user.email,
    subject: 'การขอรับรหัสผ่านใหม่บนเว็บไซต์ My Auth',
    html: `
      <p>เนื่องจากคุณอาจจะลืมรหัสผ่าน และได้มีการเรียกขอรับรหัสผ่านใหม่ผ่านทางอีเมล เราจึงได้ส่งอีเมลนี้เข้ามา หากคุณไม่ได้ดำเนินการดังกล่าวคุณไม่จำเป็นที่จะต้องสนใจลิงก์ดังต่อไปนี้</p>
      <a href="http://127.0.0.1:3000/reset-password/${token}">คลิกเพื่อขอรับรหัสผ่านใหม่</a>
    `
  })
  console.log('Reset mail send:', testSendMailUrl)
  req.flash('message', 'กรุณาตรวจสอบอีเมลเพื่อรอรับการขอรหัสผ่านใหม่')
  return res.redirect('/')
}
