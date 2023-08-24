const { Router } = require('express')
const { register, login, logout, profile, verifyToken } = require('../controllers/authController.js')
const { authRequired } = require('../middlewares/validateToken.js')
const { validateUser } = require('../middlewares/validateUser.js')

const router = Router()

router.post('/register', validateUser, register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/profile', authRequired, profile)
router.get('/verify', verifyToken)

module.exports = router