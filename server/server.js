// server.js
import express from "express";
import cors from "cors";
import { products } from "../server/data.js";

const app = express();

// Enable CORS for all routes
app.use(cors());

app.get("/products", (req, res) => {
  res.send(products);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
