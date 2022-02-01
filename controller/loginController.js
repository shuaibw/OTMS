const executeQuery = require('../models/executeQuery');

exports.handleLogin = async (req, res) => {
  username = req.body.login[0];
  password = req.body.login[1];
  passwordQuery = `SELECT PASSWORD FROM STUDENTS WHERE USERNAME=:username`;
  result = await executeQuery(passwordQuery, [username]);
  passCompare = result.rows.length != 0 ? result.rows[0].PASSWORD : -1;
  console.log(passCompare);
  if (passCompare === password) {
    res.status(200).redirect('http://localhost:5501/frontend/home.html');
  } else {
    res.status(404).redirect('http://localhost:5501/frontend/newUser.html');
  }
};
