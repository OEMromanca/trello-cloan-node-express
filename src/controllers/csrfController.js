const getCsrfToken = (req, res) => {
  const csrfToken = req.csrfToken();

  res.cookie('XSRF-TOKEN', csrfToken, {
    httpOnly: false,  
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'None',  
    maxAge: 3600000 
  });

  res.json({ csrfToken });
};

module.exports = { getCsrfToken };
