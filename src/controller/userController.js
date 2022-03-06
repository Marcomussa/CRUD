let userMethods = require('./methods')
let bcrypt = require('bcryptjs')
let {validationResult} = require('express-validator')
const db = require('../../db/models')

let userController = {
    index: (req, res) => {
        res.send('Succes')
    },
    login: (req, res) => {
        res.render('login')
    },
    register: (req, res) => {
        res.render('register')
    },
    processLogIn: (req, res) => {
        db.Users.findOne({
            where: {
                email: req.body.email
            }
        })

        .then( (par) => {
            let isPassOk = bcrypt.compareSync(req.body.password, par.password)

            if(isPassOk){
                const {name, surname, email, avatar, genero, permisos} = par
                let userToLogin = {
                    name,
                    surname,
                    email,
                    avatar,
                    genero,
                    permisos
                }
                delete userToLogin.password
                req.session.userLogged = userToLogin
                console.log(req.session.userLogged)
                if(req.body.recordarUser) {
                    res.cookie('userEmail', req.body.email, {
                        maxAge: (1000 * 60) * 2
                    })
                } 

                console.log(req.session.userLogged)

                return res.redirect('/user/profile')

            } else {
                return res.render('login', {
                    errors: {
                        email: {
                            msg: 'Las credenciales son invalidas'
                        }
                    }
                })
            }
        })
         
        .catch( (err) => {
            res.render('login', {
                errors: {
                    email: {
                        msg: 'Email no encontrado'
                    }
                }
            })
        })
        // let userToLogin = userMethods.findByField('email', req.body.email)

        // if(userToLogin){
        //     let isPassOk = bcrypt.compareSync(req.body.password, userToLogin.password)

        //     if(isPassOk){
        //         delete userToLogin.password
        //         req.session.userLogged = userToLogin

        //         if(req.body.recordarUser) {
        //             res.cookie('userEmail', req.body.email, {
        //                 maxAge: (1000 * 60) * 2
        //             })
        //         } 
        //         console.log(req.session.userLogged)
        //         return res.redirect('/user/profile')
        //     }
        //     return res.render('login', {
        //         errors: {
        //             email: {
        //                 msg: 'Las credenciales son invalidas'
        //             }
        //         }
        //     })
        // }

        // return res.render('login', {
        //     errors: {
        //         email: {
        //             msg: 'Email no encontrado'
        //         }
        //     }
        // })
    },
    processRegister: (req, res) => {
        let errors = validationResult(req)
        const validaciones = errors.array()

        if(!errors.isEmpty()){
            res.render('register', {
                data: req.body,
                validaciones
            })
            console.log(errors.array())
        }  else {
            const {name, surname, email, genero} = req.body
            let hash = bcrypt.hashSync(req.body.password, 10)
            // let userInDb = userMethods.findByField('email', req.body.email)

            db.Users.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then( (par) => {
                if (par) {
                    res.render('register', {
                        errors: {
                            email: {
                                msg: 'Este email ya esta registrado'
                            }
                        }
                    })
                } else {
                    db.Users.create({
                        name: name,
                        surname: surname,
                        email: email,
                        password: hash,
                        avatar: req.file ? req.file.filename : 'default.jpeg',
                        genero: req.body.genero ? genero : 'No especifica', 
                        permisos: false
                    })
                    res.redirect('/user/login')
                }
            })
            .catch( (err) => {
                console.log(err)
            })
            
            // if (userInDb) {
            //     return res.render('register', {
            //         errors: {
            //             email: {
            //                 msg: 'Este email ya esta registrado'
            //             }
            //         }
            //     })
            // }

            // let newUser = {
            //     ...req.body,
            //     password: hash,
            //     avatar: req.file ? req.file.filename : 'default.jpeg',
            //     genero: genero,
            //     permisos: false
            // }

            // userMethods.createLocal(newUser)

            // res.redirect('login')
        }
    },
    edit: (req, res) => {
        db.Users.findOne({
            where: {
                email: req.session.userLogged.email
            }
        })
        .then( (par) => {
            res.render('edit', {
                userLogged: par
            })
        })
        .catch( err => console.log(err))
    },
    edited: (req, res) => {
        db.Users.findOne({
            where: {
                email: req.session.userLogged.email
            }
        })
        .then( (par) => {
            const {name, surname, newPass, confirmNewPass} = req.body

            if(newPass === confirmNewPass){                
                db.Users.update({
                    name: name ? name : req.session.userLogged.name, 
                    surname: surname ? surname : req.session.userLogged.surname,
                    avatar: req.file ? req.file.filename : req.session.userLogged.avatar,
                    password: newPass ? bcrypt.hashSync(newPass, 10) : par.password
                }, {
                    where: {
                        email: req.session.userLogged.email
                    }
                })

                // db.Users.findOne({
                //     where: {
                //         email: req.session.userLogged.email
                //     }
                // })
                // .then( (par) => {
                //     req.session.userLogged = {
                //         par
                //     }
                // })
                // console.log(par.name)
                // console.log(req.session.userLogged)

                req.session.userLogged = {
                    ...req.session.userLogged,
                    name: name ? name : req.session.userLogged.name, 
                    surname: surname ? surname : req.session.userLogged.surname,
                    avatar: req.file ? req.file.filename : req.session.userLogged.avatar
                }
    
                res.redirect('/user/profile')
     
            } else {
                res.redirect('/user/edit')
            }
        })
        .catch( () => res.redirect('/user/edit'))
    },
    profile: (req, res) => {
        db.Users.findOne({
            where: {
                email: req.session.userLogged.email
            }
        })
        .then( (par) => {
            res.render('profile', {
                userLogged: par
            })
        })
        .catch( err => console.log(err))
    },
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy()
        res.redirect('/')
    }
}

module.exports = userController