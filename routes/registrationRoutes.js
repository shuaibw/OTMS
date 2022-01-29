const express = require('express');
const registrationController = require('../controller/registrationController');
const router = express.Router();

router
  .route('/student')
  .get(async (req, res) => {
    res.status(200).send('This is working');
  })
  .post(registrationController.registerStudent);

router
  .route('/instructor')
  .get(async (req, res) => {
    res.status(200).send('I am alive');
  })
  .post(registrationController.registerIntructor);

module.exports = router;
