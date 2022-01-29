const executeQuery = require('../models/executeQuery');

const checkPassword = (password, confirm_password) => {
  return password === confirm_password;
};
exports.registerIntructor = async (req, res) => {
  const regData = req.body;
  if (!checkPassword(regData.password, regData.confirm_password)) {
    res.status(204).send();
  }
  regQuery = `INSERT INTO INSTRUCTOR VALUES(NULL, :full_name, :email, :username, :password)`;
  try {
    const success = await executeQuery(regQuery, [
      regData.full_name,
      regData.email,
      regData.username,
      regData.password,
    ]);
    res.status(200).redirect('http://localhost:5501/frontend/index.html');
  } catch (err) {
    res.status(204).send();
  }
};

exports.registerStudent = async (req, res) => {
  regData = req.body;
  // console.log(existUser);
  if (!checkPassword(regData.password, regData.confirm_password)) {
    res.status(204).send();
  }
  regQuery = `INSERT INTO STUDENT VALUES(NULL, :full_name, :email, :username, :password)`;
  try {
    const success = await executeQuery(regQuery, [
      regData.full_name,
      regData.email,
      regData.username,
      regData.password,
    ]);
    res.status(200).redirect('http://localhost:5501/frontend/index.html');
  } catch (err) {
    res.status(204).send();
  }
};
