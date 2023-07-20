const jwt = require("jsonwebtoken");

const generateJwt = function (id) {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "24h" });
};
