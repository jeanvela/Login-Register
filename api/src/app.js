const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = require('./routes/index')
const app = express()

// const optionCors = {
//     // origin: 'http://localhost:5173',
//     origin: '*',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization'],
// };

app.use(cors({
    // origin: 'http://localhost:5173',
    origin: '*',
    credentials: true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use('/', router)

module.exports = app

