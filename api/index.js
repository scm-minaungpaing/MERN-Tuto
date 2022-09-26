import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import connect from './database/mongodb.js'
import cors from 'cors'

const app = express();

app.use(bodyParser.json({ limit: "30mb", extednded: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))
app.use(cors())


import transactionRoutes from './routes/transaction.js'

const PORT = process.env.PORT || 5000

//db connection
connect()




app.use('/transaction', transactionRoutes)





app.listen(PORT, console.log(`Server is Running on: ${PORT}`))

