const { csrfProtection } = require('../config/config');

const csrfMiddleware = (req, res, next) => {
  csrfProtection(req, res, next);
};

module.exports = csrfMiddleware;
