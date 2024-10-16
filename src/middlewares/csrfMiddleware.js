const { csrfProtection } = require('../config/config');

const csrfMiddleware = (req, res, next) => {
  console.log("Before CSRF Protection");
  csrfProtection(req, res, (err) => {
      if (err) {
          console.error("CSRF Protection Error:", err);
          return res.status(403).json({ error: "Invalid CSRF Token" });
      }
      console.log("After CSRF Protection");
      next();
  });
};
module.exports = csrfMiddleware;
