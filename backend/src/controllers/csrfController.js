const getCsrfToken = (req, res) => {
  const csrfToken = req.csrfToken();

  res.cookie('XSRF-TOKEN', csrfToken, {
    httpOnly: false,
    secure: true,
    sameSite: 'None',
  });

  res.json({ csrfToken });
};

module.exports = { getCsrfToken };
