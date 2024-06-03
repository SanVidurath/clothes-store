import express from 'express';
import dotenv  from 'dotenv';
import productRoutes from "./routes/products.js"
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config()

const app = express();

// middleware
// app.use((req, res, next)=>{
//     console.log(req.path, req.method);
//     next();
// })

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173'
  }));

// routes
app.use("/", productRoutes);

// connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT, ()=>{
            console.log('connected to db and listening on port', process.env.PORT);
        })
    })
    .catch((error)=>{
        console.log(error)
    })

