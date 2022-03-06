const db = require('../../db/models')
const { Op } = require('sequelize')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    index: (req, res) => {
        let directorio = [
            {
                productos: 'http://localhost:4000/api/productList',
            }, {
                categorias: 'http://localhost:4000/api/categorys',
            }, {
                ofertas: 'http://localhost:4000/api/ofertas',                
            }, {                
                destacados: 'http://localhost:4000/api/destacados',
            }, {                
                ofertasYDestacados: 'http://localhost:4000/api/ofertasDestacados'
            }
        ]
        res.json({
            cantidad_apis: directorio.length,
            directorio
        })
    },  
    productList: (req, res) => {
        db.Products.findAll()
        .then( (par) => {
            res.json(par)
        })
        .catch(err => console.log(err))
    },
    ofertas: (req, res) => {
        db.Products.findAll({
            where: {
                discount: {
                    [Op.ne]: 0
                }
            }
        })
        .then((par) => {
           res.json(par)
        })
    },
    categorys: (req, res) => {
        db.Categorys.findAll()
        .then(par => res.json(par))
    },
    destacados: (req, res) => {
        db.Products.findAll({
            order: [
                ['timesVisited', 'DESC']
            ]
        })
        .then(par => res.json(par))
    },
    ofertasDestacados: async (req, res) => {
        await fetch('http://localhost:4000/api/destacados')
        .then(par => par.json())
        .then( (destacados) => {
            fetch('http://localhost:4000/api/ofertas')
            .then(par => par.json())
            .then( (ofertas) => {
                res.json({
                    destacados,
                    ofertas
                })
            })
        })
    }
}