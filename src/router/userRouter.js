const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const middlewares = require('../middleware/middlewares')
const multer = require('../middleware/multer')
const hasPermissions = require('../middleware/hasPermissions')

//? GET:
router.get('/', userController.index)

router.get('/login', middlewares.guest, userController.login)

router.get('/register', middlewares.guest, userController.register)

router.get('/profile', middlewares.auth, userController.profile)

router.get('/edit', middlewares.auth, userController.edit)

//* POST:
router.post('/login', userController.processLogIn)

router.post('/register', 
    multer.single('avatar'),
userController.processRegister)

router.post('/logout', userController.logout)

router.post('/edited', 
    multer.single('editAvatar'),
userController.edited)

module.exports = router