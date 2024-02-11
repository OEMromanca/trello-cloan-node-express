const dotenv = require("dotenv");

dotenv.config();

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

module.exports = authorizeUser;
