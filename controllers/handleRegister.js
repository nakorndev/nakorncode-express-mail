const { v4: uuid } = require('uuid')

const sendMail = require('../utils/sendMail')
const Users = require('../models/Users')

module.exports = async (req, res) => {
  const token = uuid()
  req.body.activateToken = token
  const user = await Users.create(req.body)
  const testUrlSendMail = await sendMail({
    from: '"Admin" <admin@example.com>',
    to: user.email,
    subject: 'กรุณายืนยันตัวตนสำหรับการใช้งาน My Auth',
    html: `
      <p>กรุณายืนยันตัวตนในการสมัครสมาชิกบนเว็บไซต์ของ My Auth เพื่อดำเนินการเข้าสู่ระบบตามขั้นตอน</p>
      <a href="http://127.0.0.1:3000/confirm-email/${token}">คลิกเพื่อเปิดใช้งานบัญชี</a>
    `
  })
  console.log('Email send:', testUrlSendMail)
  req.flash('message', 'คุณได้สมัครสมาชิกเสร็จสิ้น กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ')
  return res.redirect('/')
}
