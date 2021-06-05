const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  activateToken: String,
  resetToken: String
})

schema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  try {
    this.password = await bcrypt.hash(this.password, 10)
    next()
  } catch (error) {
    next(error)
  }
})

schema.methods.comparePassword = async function (plainPassword) {
  const result = await bcrypt.compare(plainPassword, this.password)
  return result
}

module.exports = mongoose.model('Users', schema)
