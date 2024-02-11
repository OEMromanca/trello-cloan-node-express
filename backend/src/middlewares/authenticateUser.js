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

const authorizeUser = (roles) => {
  return (req, res, next) => {
    const userRoles = req.user.roles;

    if (!userRoles) {
      res.status(403).send({ error: "User roles are missing" });
      return;
    }

    if (!roles.includes(userRoles)) {
      res.status(403).send({ error: "You do not have permission" });
      return;
    }

    next();
  };
};

module.exports = authenticateUser;
