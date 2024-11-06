const getCsrfToken = (req, res) => {
  const csrfToken = req.csrfToken();
  
  res.cookie('X-CSRF-Token', csrfToken, {
    secure: false,
    sameSite:'Lax',
    maxAge: 60 * 60 * 1000,  
  });

  res.json({  csrfToken }); 
};

module.exports = { getCsrfToken };
