const express = require('express')
const router = express.Router()
const mainController = require('../controller/mainController')
const apiController = require('../controller/apiController')

router.get('/', mainController.index)

router.get('/cart', mainController.cart)

// router.get('/results', mainController.results)

router.post('/results', mainController.search)

module.exports = router