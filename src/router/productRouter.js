const express = require('express')
const router = express.Router()
const productController = require('../controller/productController')
const multer = require('../middleware/multer')

//? GET
router.get('/', productController.read)

router.get('/create', productController.create)

router.get('/offers', productController.offers)

router.get('/createCategory', productController.createCategory)

router.get('/category/:id', productController.productInCategory)

router.get('/featured/:id', productController.featured)

router.get('/update/:id', productController.update)

router.get('/:id', productController.detail)

router.get('/cart', productController.cart)


//* POST
router.post('/create', multer.single('productimg'), productController.saved)

router.post('/category', productController.category)

router.post('/updated/:id', multer.single('updateProductImg'), productController.updated)

router.post('/delete/:id', productController.delete)

module.exports = router