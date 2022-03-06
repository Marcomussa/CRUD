// Express
const express = require('express')
const app = express()
const path = require('path')
const session = require('express-session')

//Locals
const mainRouter = require('./src/router/mainRouter')
const userRouter = require('./src/router/userRouter')
const productRouter = require('./src/router/productRouter')
const apiRouter = require('./src/router/apiRouter')

//Middlewares
const isLogged = require('./src/middleware/isLogged')

// Consts
const PORT = 4000

app.use(express.urlencoded({ 
    extended: false
}))

app.use(session({
    secret: 'S4T0',
    resave: false,
    saveUninitialized: false
}))

app.use(express.json())

app.use(express.static(path.resolve(__dirname, 'public')))

app.use(express.json())

app.use(isLogged)

app.use('/', mainRouter)

app.use('/user', userRouter)

app.use('/products', productRouter)

app.use('/api', apiRouter)

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'public/views'))

app.set('user', path.join(__dirname, 'public/views/user'))

app.set('style', path.join(__dirname, 'public/styles'))

app.set('src', path.join(__dirname, './src'));

app.listen(PORT, () => console.log(`Server on Port ${PORT}`))