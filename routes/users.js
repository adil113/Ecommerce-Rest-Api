const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Customer = require("../models/user");

// Signup for new customer
router.post("/signup", async (req, res, next) => {
  try {
    const { firstName, lastName, userName, email, password, status } = req.body;
    if (!(firstName && lastName && userName && email && password) && status) {
      res.status(400).send({ message: "All input is required" });
    }
    // check if user already exist
    const userExists = await Customer.findOne({ email: email });
    if (userExists) {
      return res
        .status(409)
        .send({ message: "Email Already Exist. Please Login" });
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const customer = await Customer.create({
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      email: email.toLowerCase(),
      password: encryptedPassword,
      status: status,
    });

    res.status(201).json(customer);
  } catch (error) {
    console.log(error);
  }
});

// ! Login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send({ message: "All input is required" });
    }

    const customer = await Customer.findOne({ email });

    if (customer && (await bcrypt.compare(password, customer.password))) {
      const token = jwt.sign({ email: email }, process.env.JWT_KEY, {
        expiresIn: "2h",
      });

      res.status(200).send({ message: "Login Success", token: token, customer: customer});
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
