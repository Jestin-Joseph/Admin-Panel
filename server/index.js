import express from 'express'
import bodyParser from 'body-parser'        
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'

import clientRoutes from './routes/client.js'
import generalRoutes from './routes/general.js'
import managementRoutes from './routes/management.js'
import salesRoutes from './routes/sales.js'
import UserData from './models/Users.js'
import Transaction from './models/Transaction.js'
import { dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat } from './data/index.js'
import Product from './models/Product.js'
import ProductStat from './models/ProductStat.js'
import OverallStat from './models/OverallStat.js'


dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin'}))
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(cors())

app.use('/client', clientRoutes)
app.use('/general', generalRoutes)
app.use('/management', managementRoutes)
app.use('/sales', salesRoutes)

const PORT = 5001 || 9000
mongoose.connect("mongodb+srv://admin-royce:test123@cluster0.yikcd.mongodb.net/?retryWrites=true&w=majority", 
{useNewUrlParser: true, useUnifiedTopology: true,}).then(() => { app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))

    //Adding user data (Don't uncomment- It's single insertion)
    // UserData.insertMany(dataUser)
    // Product.insertMany(dataProduct)
    // ProductStat.insertMany(dataProductStat)
    // Transaction.insertMany(dataTransaction)
    // OverallStat.insertMany(dataOverallStat)
    })
    .catch((err) => console.log(`${err} did not connect`))

