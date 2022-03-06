let userMethods = require('../controller/methods')

let middlewares = {
    auth: (req, res, next) => {
        if(!req.session.userLogged){
            return res.redirect('/user/login')
        }
        next()
    },
    guest: (req, res, next) => {
        if(req.session.userLogged){
            return res.redirect('/user/profile')
        }
        next()
    }
}

module.exports = middlewares