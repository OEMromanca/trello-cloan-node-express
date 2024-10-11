const getCsrfToken = (req, res) => {
  const csrfToken = req.csrfToken();

  res.cookie('XSRF-TOKEN', csrfToken, {
    httpOnly: true, 
    sameSite: 'None', 
    secure: process.env.NODE_ENV === 'production',
  });
  res.json({ csrfToken });
};


module.exports = { getCsrfToken };
