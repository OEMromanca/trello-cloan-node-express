const crypto = require('crypto');
const csurf = require('csurf');

const secretKey = crypto.randomBytes(32).toString('hex');
const csrfProtection = csurf({ cookie: true });

module.exports = {
  secretKey,
  csrfProtection,
};
