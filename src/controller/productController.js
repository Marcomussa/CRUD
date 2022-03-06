const db = require('../../db/models')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

let productController = {
    read: (req, res) => {
        fetch('http://localhost:4000/api/destacados')
        .then(res => res.json())
        .then( (products) => {
            db.Categorys.findAll()
            .then( (categorys) => {
                res.render('read', {
                        products,
                        categorys,
                        user: req.session.userLogged ? req.session.userLogged : false
                })
            })
        })
    },
    create: (req, res) => {
        db.Categorys.findAll()
        .then( (par) => {
            res.render('create', {
                categorys: par
            })
        })
    },
    saved: (req, res) => {
        const {name, description, price, discount, category} = req.body
        let date = new Date().toLocaleDateString()

        db.Categorys.findOne({
            where: {
                id: category
            }
        })
        .then((par) => {
            db.Products.create({
                name: name,
                description: description,
                price: price,
                discount: discount ? discount : '0',
                priceWithDiscount: price - (price * 0.01 * discount),
                category_id: category,
                category: par.name,
                img: req.file ? req.file.filename : 'default.jpeg',
                date: date,
                timesVisited: 0
            })
        })
        .catch(err => console.log(err))

        res.redirect('/products')        
    },
    detail: async function(req, res){
        let findProduct = await db.Products.findByPk(req.params.id)
        let updateTimesVisited = await db.Products.update({
                timesVisited: findProduct.timesVisited + 1
            }, {
                where: {
                    id: req.params.id
                }
            }
        )
        Promise.all([findProduct, updateTimesVisited])
        .then( (par) => {
            res.render('detail', {
                products: par[0]
            })
        })
        
    },
    update: (req, res) => {
        db.Products.findByPk(req.params.id)
        .then( (par) => {
            res.render('update', {
                products: par
            })
        })
        .catch( (err) => console.log(err))
    },
    updated: async (req, res) => {
        const {name, description, price, discount} = req.body
        let findProduct = await db.Products.findOne({
            where: {
                id: req.params.id
            }
        })

        db.Products.update({
            name: name,
            description: description,
            price: Number(price),
            discount: Number(discount),
            priceWithDiscount: Number(price - (price * 0.01 * discount)),
            img: req.file ? req.file.filename : findProduct.img
        }, {
            where: {
                id: req.params.id
            }
        })

        res.redirect(`/products/${findProduct.id}`)
    },
    delete: (req, res) => {
        db.Products.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/')
    },
    category: (req, res) => {
        const {name} = req.body
        db.Categorys.create({
            name
        })
        res.redirect('/products')
    },
    createCategory: (req, res) => {
        res.render('createCategory')
    },
    productInCategory: (req, res) => {
        let reg = /,/g;
        const products = db.Products.findAll({
            where: {
                category_id: req.params.id
            }
        })
        const categorys = db.Categorys.findAll()
        let allPromises = Promise.all([products, categorys])
        allPromises.then( (par) => {
            res.render('categorys', {
                products: par[0],
                categorys: par[1],
                categoryName: par[1][req.params.id - 1].name,
                user: req.session.userLogged ? req.session.userLogged : false
            })
        })  
    },
    offers: (req, res) => {
        fetch('http://localhost:4000/api/ofertas')
        .then(res => res.json())
        .then( (par) => {
            res.render('offers', {
                products: par,
                user: req.session.userLogged ? req.session.userLogged : false
            })
        })
    }
}

module.exports = productController