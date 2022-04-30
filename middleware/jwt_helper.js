// const jwt = require("jsonwebtoken");

// module.exports = {
//   verify_access_token: (req, res, next) => {
//     try {
//       const token = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_KEY);
//       req.payload = decoded;
//       next();
//     } catch (error) {
//       return res.status(401).json({
//         message: "unauthorized Request",
//       });
//     }
//   },
// };


const jwt = require("jsonwebtoken");

module.exports = {
 verify_access_token:(req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({message: "A token is required for authentication"});
  }
  try {
    const accessToken = req.headers.authorization.trim().split(' ')[1];
    const decoded = jwt.verify(accessToken, process.env.JWT_KEY);
    req.payload = decoded;
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Token",
    });;
  }
  return next();
}
}

