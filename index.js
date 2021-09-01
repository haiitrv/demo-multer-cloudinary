const express = require('express')
const multer = require('multer')
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/user.route'))



const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
}).then(() => {
    console.log('Database is connected...!')
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
}).catch(err => console.log(err.message))