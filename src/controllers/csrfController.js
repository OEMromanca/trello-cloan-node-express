const getCsrfToken = (req, res) => {
  const csrfToken = req.csrfToken();
 

  res.json({ csrfToken });
};

module.exports = { getCsrfToken };
