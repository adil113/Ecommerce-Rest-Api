const express = require("express");
const app = express(); 
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require('morgan');
const cors = require('cors');

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
  const adminRoutes = require("./routes/admin_user");
  const productRoutes = require("./routes/products");
  const categoryRoutes = require("./routes/product_category");
  
  app.use(morgan("dev"));
  app.use(cors({
    origin:'*'
  }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use('/uploads', express.static('uploads'));

app.use("/customer", customerRoutes);
app.use("/admin", adminRoutes);
app.use("/products", productRoutes);
app.use("/category", categoryRoutes);

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
