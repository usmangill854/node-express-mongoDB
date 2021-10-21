const express = require('express')
const app = express();
require('dotenv/config')

const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const authJwt = require('./helpers/jwt.js')
//middle ware
app.use(express.json());
app.use(morgan('tiny'))
app.use(authJwt());
app.use('/public/uploads',express.static(__dirname+'/public/uploads'))


app.use(cors())
app.options('*',cors())

//Routes
const categoriesRoutes = require('./routers/categories')
const productsRoutes = require('./routers/products')
const usersRoutes = require('./routers/users')
const ordersRoutes = require('./routers/orders')


const api=process.env.API_URL

app.use(`${api}/categories` , categoriesRoutes)
app.use(`${api}/products`,productsRoutes)
app.use(`${api}/users`,usersRoutes)
app.use(`${api}/orders`,ordersRoutes)

//database
const dbConnect = async () => {

    try{await mongoose.connect(process.env.CONNECTION_STRING)
        console.log('db is connected')
    }  catch(err) {
        console.log(err)
    }
}
dbConnect();


app.listen(3000,() => {
    console.log(api)
    console.log('server is running on port http://localhost:3000/')
})