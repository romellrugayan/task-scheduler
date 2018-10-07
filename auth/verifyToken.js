const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({ isAuth: false, msg: "No token provided" });
  }

  jwt.verify(token, keys.secretOrKey, (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .json({ isAuth: false, msg: "Failed to authenticate token." });
    }

    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
