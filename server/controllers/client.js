import getCountryIso3 from 'country-iso-2-to-3'

import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from '../models/Users.js'
import Transaction from "../models/Transaction.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        const productWithStats = await Promise.all(
            products.map(async (product) => {
                const stat = await ProductStat.find({
                    productId: product._id,
                })
                return {
                    ...product._doc,
                    stat,
                }
            })
        )
        res.status(200).json(productWithStats)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const getCustomers = async (req, res) => {
    try {
        const customers = await User.find({ role: 'user'}).select('-password')
        res.status(200).json(customers)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const getTransactions = async(req, res) => {
    try {
      const { page = 1, pageSize = 20, sort = null, search = " ", transactionsSearch = " " } = req.query
    //   console.log(req.query)
    
    console.log(" this: "+ search )
      
      const generateSort = () => {
        const sortParsed = JSON.parse(sort)
        const sortFormatted = {
            [sortParsed.field]: (sortParsed.sort = 'asc' ? 1 : -1)
        }

        return sortFormatted
      }

      const sortFormatted = Boolean(sort) ? generateSort() : {}

      const transactions = await Transaction.find({
        $or : [
            {cost: {$regex: new RegExp(search, 'i')}},
            {userId: { $regex: new RegExp(search, 'i')}}
           
            
        ]
      })

      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize)

      const total = await Transaction.countDocuments({
        name: {$regex: search, $option: 'i'}
      })
      res.status(200).json({transactions, total});

    } catch(error) {
        res.status(404).json({ message: error})
    }
}

export const getGeography = async (req, res) => {
    try {
        const users = await User.find()
        const mapLocation = users.reduce((acc, { country }) => {
            const countryIso = getCountryIso3(country)

            if(!acc[countryIso]) {
                acc[countryIso] = 0
            }
            acc[countryIso]++
            return acc
        }, {})

        const formattedLocations = Object.entries(mapLocation).map(
            ([country, count]) => {
                return { id: country, value: count }
            }
        )
        res.status(200).json(formattedLocations)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

