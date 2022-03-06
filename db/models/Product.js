module.exports = (sequelize, dataTypes) => {
    let alias = 'Products'

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true
            
        },
        name: {
            type: dataTypes.STRING(50)
        }, 
        description: {
            type: dataTypes.STRING(500)
        }, 
        price: {
            type: dataTypes.INTEGER
        },
        discount: {
            type: dataTypes.INTEGER
        },
        priceWithDiscount: {
            type: dataTypes.INTEGER
        },
        category: {
            type: dataTypes.STRING(255)
        },
        category_id: {
            type: dataTypes.STRING(255)
        },
        img: {
            type: dataTypes.INTEGER
        },
        date: {
            type: dataTypes.DATE
        },
        timesVisited: {
            type: dataTypes.INTEGER
        }
    }

    let config = {
        tableName: 'Products',
        timestamps: false
    }

    const Productos = sequelize.define(alias, cols, config)

    return Productos
}