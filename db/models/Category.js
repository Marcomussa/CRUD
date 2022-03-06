module.exports = (sequelize, dataTypes) => {
    let alias = 'Categorys'

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true
            
        },
        name: {
            type: dataTypes.STRING(50)
        } 
    }

    let config = {
        tableName: 'Categorys',
        timestamps: false
    }

    const Categorys = sequelize.define(alias, cols, config)

    return Categorys
}