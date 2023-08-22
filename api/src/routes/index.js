const { Router } = require('express')
const authRoutes = require ('./auth.routes.js')
const  poemsRoutes = require ('./poems.routes.js')
const router = Router()

router.use('/api', authRoutes)
router.use('/api', poemsRoutes)

module.exports = router
