const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UserModel = require("../models/UserModel");
const { secretKey } = require("../config/config");

dotenv.config();

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;  
    if (!token) {
      throw new Error('No token provided');
    }

    const decoded = jwt.verify(token, secretKey);
    const user = await UserModel.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error('User not found');
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};



module.exports = authenticateUser;
 