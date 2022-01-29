const express = require('express');
const loginController = require('../controller/loginController');
const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    res.status(200).send('This is working');
  })
  .post(loginController.handleLogin);

module.exports = router;
