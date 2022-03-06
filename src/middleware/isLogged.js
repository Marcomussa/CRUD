const userMethods = require('../controller/methods')

function isLogged(req, res, next){
    res.locals.isLogged = false;

    let emailInCookie = req.cookies;
    let userFromCookie = userMethods.findByField('email', emailInCookie);

    if (userFromCookie) {
        req.session.userLogged = userFromCookie;
    }

    if (req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = isLogged