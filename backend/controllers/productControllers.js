import Product from "../models/productsModel.js";

// get all products
const getProducts = async(req, res)=>{
    const products = await Product.find({}).sort({ id: 1})

    res.status(200).json(products)
}

export default getProducts;