module.exports = (sequelize, dataTypes) => {
    let alias = 'Users'

    let cols = {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        name: {
            type: dataTypes.STRING(255)
        },
        surname: {
            type: dataTypes.STRING(255)
        },
        email: {
            type: dataTypes.STRING(255)
        },
        password: {
            type: dataTypes.STRING(255)
        },
        avatar: {
            type: dataTypes.STRING(255)
        },
        genero: {
            type: dataTypes.STRING(255)
        },
        permisos: {
            type: dataTypes.STRING(255)
        }
    }

    let config = {
        tableName: 'Users',
        timestamps: false
    }

    const User = sequelize.define(alias, cols, config)
    
    return User
}