const { Router } = require('express')
const { register, login, logout, profile, verifyToken } = require('../controllers/authController.js')
const { authRequired } = require('../middlewares/validateToken.js')
// const {  } = require('../middlewares/validator.middleware.js')
// const {  } = required('../errors/authError')

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/profile', authRequired, profile)
router.get('/verify', verifyToken)

module.exports = router