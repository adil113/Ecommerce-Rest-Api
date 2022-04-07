const express = require("express");
const app = express(); 
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require('morgan');

//! Database Connection
const MONGODB_URI = `mongodb://localhost:27017/nike`;
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error(err);
    console.log(" MongoDB connection error", err);
  });

const customerRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const categoryRoutes = require("./routes/product_category");


//! Morgan To Log Information About Request
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

//! Middleware For Core Errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/customer", customerRoutes);
app.use("/products", productRoutes);
app.use("/category", categoryRoutes);


//! Middleware For Error Handling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});




module.exports = app;
