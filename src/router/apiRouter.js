const express = require('express')
const router = express.Router()
const apiController = require('../controller/apiController')

router.get('/', apiController.index)

router.get('/productList', apiController.productList)

router.get('/ofertas', apiController.ofertas)

router.get('/categorys', apiController.categorys)

router.get('/destacados', apiController.destacados)

router.get('/ofertasDestacados', apiController.ofertasDestacados)

router.get('/totalPerCategory', apiController.totalPerCategory)

module.exports = router