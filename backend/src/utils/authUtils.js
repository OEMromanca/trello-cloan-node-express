const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/config");

function generateAccessToken(user) {
  return jwt.sign({ sub: user._id }, secretKey, {
    // expiresIn: "15m", SET UP according to needs,for now temporarily dissabled
  });
}

function generateRefreshToken(user) {
  return jwt.sign({ sub: user._id }, secretKey, {
    expiresIn: "7d",
  });
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
