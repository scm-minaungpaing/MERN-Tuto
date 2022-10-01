import * as dotenv from 'dotenv' 
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import connect from './database/mongodb.js'
import cors from 'cors'
import passport from 'passport'
import psssportConfig from './config/passport.js'

dotenv.config()
const app = express();

app.use(bodyParser.json({ limit: "30mb", extednded: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))
app.use(cors())
app.use(passport.initialize())
psssportConfig(passport)


import transactionRoutes from './routes/transaction.js'
import authRoutes from './routes/auth.js'

const PORT = process.env.PORT || 5000

//db connection
connect()




app.use('/transaction', transactionRoutes)
app.use('/auth', authRoutes)





app.listen(PORT, console.log(`Server is Running on: ${PORT}`))

