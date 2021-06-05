const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')
const methodOverride = require('method-override')
const router = require('express-async-router').AsyncRouter()

const mongodbUrl = 'mongodb://127.0.0.1:27017/my-auth'
mongoose.connect(mongodbUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
const mongodbStore = new MongoDBStore({
  uri: mongodbUrl,
  collection: 'sessions'
})

const app = express()
app.set('view engine', 'pug')
app.set('views', './views')
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))
app.use(session({
  secret: 'randomString',
  resave: false,
  saveUninitialized: false,
  store: mongodbStore // MemoryStore
}))
app.use(flash())

const authOnly = require('./middleware/authOnly')

router.get('/', require('./controllers/renderIndex'))
router.get('/register', require('./controllers/renderRegister'))
router.post('/register', require('./controllers/handleRegister'))
router.get('/login', require('./controllers/renderLogin'))
router.post('/login', require('./controllers/handleLogin'))
router.get('/logout', require('./controllers/handleLogout'))
router.get('/edit-password', authOnly, require('./controllers/renderEditPassword'))
router.put('/password', authOnly, require('./controllers/handleChangePassword'))
router.get('/confirm-email/:token', require('./controllers/handleConfirmEmail'))
router.get('/forget-password', require('./controllers/renderForgetPassword'))
router.post('/reset-password', require('./controllers/handleRequestResetPassword'))
router.get('/reset-password/:token', require('./controllers/renderResetPassword'))
router.put('/reset-password/:token', require('./controllers/handleResetPassword'))
app.use('/', router)

app.listen(3000, () => {
  console.log('App listening on http://127.0.0.1:3000')
})
