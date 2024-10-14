const getCsrfToken = (req, res) => {
  const csrfToken = req.csrfToken();

  res.cookie('XSRF-TOKEN', csrfToken, {
    httpOnly: false, 
    sameSite: 'None', 
    secure:true,
  });
  res.json({ csrfToken });
};


module.exports = { getCsrfToken };
