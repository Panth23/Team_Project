import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import colors from "colours";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errormiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

//body-parser for Post requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Products and User Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

//Middleware error catching
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on Port ${PORT}`.yellow
  )
);
