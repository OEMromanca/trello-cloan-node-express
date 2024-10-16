const getCsrfToken = (req, res) => {
  const csrfToken = req.csrfToken();

  console.log("token");

  res.cookie('XSRF-TOKEN', csrfToken, {
    httpOnly: false,
    sameSite: 'None', 
    secure: true,
  });

  res.json({ 'XSRF-TOKEN': csrfToken }); 
};

module.exports = { getCsrfToken };
