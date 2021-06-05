module.exports = (req, res, next) => {
  if (req.session.auth) {
    next()
  } else {
    next(new Error('กรุณาเข้าสู่ระบบ'))
  }
}
