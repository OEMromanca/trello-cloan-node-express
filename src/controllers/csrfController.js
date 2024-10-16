const getCsrfToken = (req, res, next) => {
  const csrfToken = req.csrfToken();

  console.log("token")

  res.cookie('XSRF-TOKEN', csrfToken, {
    httpOnly: false,
    sameSite: 'None', 
    secure:true,
  });
  next();
};


module.exports = { getCsrfToken };
