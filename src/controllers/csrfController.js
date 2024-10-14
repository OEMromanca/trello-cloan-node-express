const getCsrfToken = (req, res) => {
  const csrfToken = req.locals.csrfToken();

  res.json({ csrfToken });
};


module.exports = { getCsrfToken };
