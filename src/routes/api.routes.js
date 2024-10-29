const { checkToken } = require('../utils/middlewares.js')

const router = require('express').Router()

router.use('/products', require('./api/productos.routes'))
router.use('/users', require('./api/users.routes.js'))

module.exports = router