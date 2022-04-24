// const mongoose = require("mongoose");
const Customer = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "clement.upton9@ethereal.email",
    pass: "jUgwWYTbkphkHNNwEh",
  },
});

exports.signup_new_customer = async (req, res, next) => {
  try {
    const { firstName, lastName, userName, email, password } = req.body;
    const userExists = await Customer.findOne({ email: email });
    if (userExists) {
      return res
        .status(409)
        .json({ message: "Email Already Exist. Please Login" });
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const customer = await Customer.create({
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      email: email.toLowerCase(),
      password: encryptedPassword,
      verificationToken: crypto.randomBytes(24).toString("hex"),
    });

    // Send verification email to Customer
    let mailOptions = {
      form: "tayyabsiraj112233@gmail.com",
      to: customer.email,
      subject: "Verify Your Email Address",
      html: `
        <h2>${customer.firstName} ${customer.lastName} Thanks For Sign Up</h2>
        <h4>Please verify your email</h4>
        <a href="http://localhost:3000/customer/verify/${customer.verificationToken}">
        Verify Email</a>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).json({
          msg: "Technical Issue!, Please click on resend for verify your Email.",
        });
      } else {
        console.log(info, "email send");
      }
    });

    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error"});
  }
};

exports.verify_customer_email = async (req, res, next) => {
  try {
    const verificationToken = req.params.token;
    console.log(verificationToken);
    const customer = await Customer.findOne({
      verificationToken,
    });

    if (!customer) {
      return res.status(400).json({
        msg: "Your verification link may have expired. Please click on resend for verify your Email.",
      });
    } else if (customer.status == true) {
      return res
        .status(200)
        .json("User has been already verified. Please Login");
    } else {
      customer.status = true;
      customer.save((err) => {
        if (err) {
          return res.status(500).json({ msg: err.message });
        } else {
          return res
            .status(200)
            .json("Your account has been successfully verified");
        }
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error"});
  }
};

exports.login_customer = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).json({ message: "All input is required" });
    }

    const customer = await Customer.findOne({ email });

    if (customer && (await bcrypt.compare(password, customer.password))) {
      const token = jwt.sign({ email: email }, process.env.JWT_KEY, {
        expiresIn: "5h",
      });

      res
        .status(200)
        .json({ message: "Login Success", token: token, customer: customer });
    } else {
      res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error"});
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
      res.status(404).json({ message: "No User Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error"});
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
    res.status(500).json({ message: "Internal Server Error"});
  }
};

exports.delete_single_customer = async (req, res, next) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findByIdAndDelete(id);
    if (customer) {
      res.status(200).json({ message: "Customer Deleted" });
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error"});
  }
};

exports.get_all_customers = async (req, res, next) => {
  try {
    const customers = await Customer.find({});

    if (!customers) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.status(200).json({ customers: customers });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error"});
  }
};
