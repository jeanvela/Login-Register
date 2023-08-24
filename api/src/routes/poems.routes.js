const { Router } = require('express')
const { getPoems, poemById, createPoems, deletePoem, editPoems, allgetPoems } = require('../controllers/poemsController.js')
const { authRequired } = require('../middlewares/validateToken.js')
const { errorSchemaPoem } = require('../middlewares/errorSchemaPoem.js')

const router = Router()

router.get('/allPoems', allgetPoems)
router.get('/poems', authRequired, getPoems)
router.get('/poems/:id', authRequired, poemById)
router.post('/poems/post', authRequired, createPoems)
router.delete('/poems/:id', authRequired, deletePoem)
router.put('/poems/:id', authRequired, editPoems)

module.exports = router