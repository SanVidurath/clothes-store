import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    forGender: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String, required: true },
    availableSize: { type: [String], required: true },
    price: { type: String, required: true },
    isFreeShipping: { type: Boolean, required: true },
    quantity: { type: Number, required: true }
}, {collection: "products"})

const Product = mongoose.model("Product", productSchema)

export default Product;