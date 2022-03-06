function hasPermissions(req, res, next){
    if(req.session.userLogged.permisos == '1'){
        res.locals.hasPermissions = true
    } else {
        res.locals.hasPermissions = false
    }

    next()
}

module.exports = hasPermissions