const nodemailer = require('nodemailer')

module.exports = async (data) => {
  const testAccount = await nodemailer.createTestAccount() // test
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  })
  const info = await transporter.sendMail(data)
  return nodemailer.getTestMessageUrl(info) // test
}
