const { csrfProtection } = require('../config/config');

const csrfMiddleware = (req, res, next) => {
  csrfProtection(req, res, (err) => {
      if (err) {
          console.error("CSRF Protection Error:", err);
          return res.status(403).json({ error: "Invalid CSRF Token" });
      }
     
      next();
  });
};
module.exports = csrfMiddleware;
