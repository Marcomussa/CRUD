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
            }, {
                totalPerCategory: 'http://localhost:4000/api/totalPerCategory'
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
            ], 
            limit: 12
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
    },
    totalPerCategory: (req, res) => {
        let count_1 = 0
        let count_2 = 0
        let count_3 = 0
        let count_4 = 0
        let count_5 = 0
        let count_6 = 0
        let count_7 = 0
        let count_8 = 0

        db.Products.findAll()
        .then((par) => {
            for(let i = 0; i < par.length; i++){
                if(par[i].category_id == 1){
                    count_1 += 1
                }
                if(par[i].category_id == 2){
                    count_2 += 1
                }
                if(par[i].category_id == 3){
                    count_3 += 1
                }
                if(par[i].category_id == 4){
                    count_4 += 1
                }
                if(par[i].category_id == 5){
                    count_5 += 1
                }
                if(par[i].category_id == 6){
                    count_6 += 1
                }
                if(par[i].category_id == 7){
                    count_7 += 1
                }
                if(par[i].category_id == 8){
                    count_8 += 8
                }
            }

            db.Categorys.findAll()
            .then((category) => {
                res.json(
                [{ 
                    id: category[0].id,
                    name: category[0].name,
                    count: count_1,
                }, {
                    id: category[1].id,
                    name: category[1].name,
                    count: count_2, 
                }, {
                    id: category[2].id,
                    name: category[2].name,
                    count: count_3,
                }, {
                    id: category[3].id,
                    name: category[3].name,
                    count: count_4,
                }, {
                    id: category[4].id,
                    name: category[4].name,
                    count: count_5,
                }, {
                    id: category[5].id,
                    name: category[5].name,
                    count: count_6,
                }, {
                    id: category[6].id,
                    name: category[6].name,
                    count: count_7
                }, {
                    id: category[7].id,
                    name: category[7].name,
                    count: count_8
                }])
            })
            .then(err => console.log(err))
        })
        .catch(err => console.log(err))
    },
}