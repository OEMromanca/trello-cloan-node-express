const getCsrfToken = (req, res) => {
  const csrfToken = req.csrfToken();

  console.log("token");

  res.cookie('X-CSRF-Token', csrfToken, {
    httpOnly: false,
    sameSite: 'None', 
    secure: true,
  });

  res.json({ CSRFToken: csrfToken });
 
};

module.exports = { getCsrfToken };
