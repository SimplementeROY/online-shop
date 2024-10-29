const { loginUsuario, registerUsuario, addProductCart, getProfile } = require('../../controllers/users.controller');
const { checkToken } = require('../../utils/middlewares');

const router = require('express').Router()

router.get('/profile', checkToken, getProfile)

router.post('/login', loginUsuario);
router.post('/register', registerUsuario);

router.put('/add/:productId', checkToken, addProductCart);

module.exports = router