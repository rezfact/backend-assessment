require('dotenv').config()
const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const errorHandler = require('./helpers/errorHandler')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)
app.use(errorHandler)

module.exports = app
