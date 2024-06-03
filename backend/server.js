import express from 'express';
import dotenv  from 'dotenv';
import productRoutes from "./routes/products.js"
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config()
const port=3000;
const mongo_uri=mongodb+srv://sonnymad33:3K5odh4vc2O0stwg@products-cluster.xl0ltbt.mongodb.net/Products-Cluster?retryWrites=true&w=majority&appName=Products-Cluster;

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
mongoose.connect(mongo_uri)
    .then(()=>{
        app.listen(port, ()=>{
            console.log('connected to db and listening on port', port);
        })
    })
    .catch((error)=>{
        console.log(error)
    })

