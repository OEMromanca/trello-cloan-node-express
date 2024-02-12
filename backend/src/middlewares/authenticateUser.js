const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UserModel = require("../models/UserModel");
const { secretKey } = require("../config/config");

dotenv.config();

const authenticateUser = async (req, res, next) => {
  try {
    const authorizationHeader = req.header("Authorization");
    if (!authorizationHeader) {
      throw new Error("Authorization header missing");
    }

    const token = authorizationHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, secretKey);

    const user = await UserModel.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("UnauthorizedUserDetected!");
    }
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = authenticateUser;
