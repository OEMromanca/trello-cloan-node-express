const getCsrfToken = (req, res) => {
  const csrfToken = req.csrfToken();

  console.log("token");

  res.cookie('X-CSRF-Token', csrfToken, {
    httpOnly: true,
    secure: false,
    sameSite:'Lax',
    maxAge: 60 * 60 * 1000,  
  });

  res.json({  csrfToken }); 
};

module.exports = { getCsrfToken };
