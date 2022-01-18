const e = require('express');
const express = require('express');
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OBJECT;

let connection;

const executeQuery = async (query, params) => {
  if (!connection) {
    connection = await oracledb.getConnection({
      user: 'C##SHUAIB',
      password: 'hr',
      connectionString: 'localhost/orcl',
    });
  }
  try {
    let result = await connection.execute(query, params);
    return result.rows.length == 0 ? 0 : result.rows[0].PASSWORD;
  } catch (err) {
    console.log(err);
  }
};

const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    res.status(200).send('This is working');
  })
  .post(async (req, res) => {
    username = req.body.login[0];
    password = req.body.login[1];
    passwordQuery = `SELECT PASSWORD FROM STUDENT WHERE USERNAME='${username}'`;
    passCompare = await executeQuery(passwordQuery, []);
    console.log(passCompare);
    if (passCompare === password) {
      res.status(200).redirect('http://localhost:5501/frontend/home.html');
    } else {
      res.status(404).redirect('http://localhost:5501/frontend/newUser.html');
    }
  });

module.exports = router;
