import express from 'express';
import getProducts from '../controllers/productControllers.js';

const router = express.Router();

router.get("/", (req, res)=>{
    res.json({mssg: "hello"})
})

router.get("/products", getProducts)

export default router
