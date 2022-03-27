const mongoose = require("mongoose");
const Customer = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup_new_customer = async (req, res, next) => {
  try {
    const { firstName, lastName, userName, email, password, status } = req.body;
    if (!(firstName && lastName && userName && email && password) && status) {
      res.status(400).send({ message: "All input is required" });
    }
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
};

exports.login_customer = async (req, res, next) => {
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

      res
        .status(200)
        .send({ message: "Login Success", token: token, customer: customer });
    } else {
      res.status(400).send({ message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.get_single_customer = async (req, res, next) => {
  try {
    const id = req.params.id;
    // const customer = await Customer.findById({_id :id})
    const customer = await Customer.findById(id).exec();

    if (customer) {
      res.status(200).json({ customer: customer });
    } else {
      res.status(404).send({ message: "No User Found" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.update_single_customer = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    const customer = await Customer.findByIdAndUpdate(id, updates);

    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
    } else {
      res.status(200).json({ Customer: customer });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.delete_single_customer = async (req, res, next) => {
  const id = req.params.id;
  const customer = await Customer.findByIdAndDelete(id);
  if (customer) {
    res.status(200).json({ message: "Customer Deleted" });
  } else {
    res.status(404).json({ message: "Customer not found" });
  }
};
