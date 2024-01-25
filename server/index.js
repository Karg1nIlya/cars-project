require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = require('./router/index')
const errorMiddleware = require('./middlewares/error-middleware')

const app = express()
const pool = require('./config/database')

app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
// app.use(express.json())//для того, чтобы работать с request
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
})) // для того, чтобы взаимодействовать с сервером и браузером без проблем
app.use(cookieParser())// чтобы работали cookie
app.use('/api', router)
app.use(errorMiddleware)

const PORT = process.env.PORT ?? 4001

const start = async () => {
    try {
        pool.connect()
        app.listen(PORT, ()=>{
            console.log(`Server started on port = ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()