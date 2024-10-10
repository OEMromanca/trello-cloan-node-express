const getCsrfToken = (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie('XSRF-TOKEN', csrfToken, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
  res.locals.csrftoken = req.csrfToken();


  res.json({ csrfToken });
};

module.exports = { getCsrfToken };
