const db = require('../../db/models')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { Op } = require('sequelize')

let mainController = {
    index: (req, res) => {
        fetch('http://localhost:4000/api/ofertasDestacados')
        .then(res => res.json())
        .then(par => {
            const {destacados, ofertas} = par
            res.render('index', {
                destacados,
                ofertas,
                user: req.session.userLogged ? req.session.userLogged : false
            })
        })
    },
    cart: (req, res) => {
        db.Products.findAll()
        .then((data) => {
            res.render('cart', {
                products: data,
                user: req.session.userLogged ? req.session.userLogged : false
            })
        })
    },
    search: (req, res) => {
        let { searchResult } = req.body 
        db.Products.findAll({
            where: {
                name: {
                    [Op.like]: `%${searchResult}%`
                }
            }
        })
        .then((results) => {
            res.render('searchResults', {
                wordSearched: searchResult,
                results
            })
        })
    },
    // results: (req, res) => {
    //     res.render('searchResults')
    // }
}

module.exports = mainController