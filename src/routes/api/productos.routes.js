const router = require('express').Router()

const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDepartment, getProductsByPrice, getAvailableProducts, getProductById } = require('../../controllers/productos.controller');
const { checkToken } = require('../../utils/middlewares');

router.get('/', getAllProducts);
router.get('/dpt/:department', getProductDepartment);
router.get('/price', getProductsByPrice);
router.get('/available', getAvailableProducts);
router.get('/:productId', getProductById);

router.post('/', checkToken, createProduct);

router.put('/:productId', checkToken, updateProduct);

router.delete('/:productId', checkToken, deleteProduct)
module.exports = router