const http = require("http");
const app = require('./app');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;

app.listen(3000, function () {
  console.log("app is running in port 3000");
});
