const getCsrfToken = async(req, res) => {
  const csrfToken = await req.csrfToken();

  res.cookie('XSRF-TOKEN', csrfToken, {
    httpOnly: true, 
    sameSite: 'None', 
    secure:true,
  });
  res.json({ csrfToken });
};


module.exports = { getCsrfToken };
