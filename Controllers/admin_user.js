const bcrypt = require("bcrypt");
const Admin = require("../models/admin_user");
const jwt = require("jsonwebtoken");

exports.add_new_admin = async (req, res, next) => {
  try {
    const { name, email, password, status, role } = req.body;
    const adminExists = await Admin.findOne({ email: email });

    if (adminExists) {
      return res.status(409).json({ message: "Email Already Exist." });
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name: name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      status: status.toLowerCase(),
      role: role,
    });
    res.status(201).json(admin);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.admin_login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).json({ message: "All inputs are required" });
    }

    const admin = await Admin.findOne({ email });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      const token = jwt.sign({ email: email }, process.env.JWT_KEY, {
        expiresIn: "5h",
      });
      // res.status(200).json({token});
      res.status(200).json(token);
    }
  // else{
  //   res.status(400).json({ message: "Invalid Credentials" });
  // }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
