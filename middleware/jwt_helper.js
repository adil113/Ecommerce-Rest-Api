const jwt = require("jsonwebtoken");

module.exports = {
  verify_access_token: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.payload = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        message: "unauthorized Request",
      });
    }
  },
};
