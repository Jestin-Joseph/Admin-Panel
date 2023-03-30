import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    description: String,
    category: String,
    rating: Number,
    supply: Number
},
    { timestamps: true }
)

const Product = mongoose.model('Product', ProductSchema)
export default Product