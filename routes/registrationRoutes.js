const express = require('express');
const registrationController = require('../controller/registrationController');
const router = express.Router();
const path = require('path');
const checkAuth = require('../controller/checkAuth');

router.route('/').get(checkAuth.not, async (req, res) => {
    res.render(path.resolve('frontend/register.ejs'));
});
router.route('/student').post(checkAuth.not, registrationController.registerStudent);

router.route('/instructor').post(checkAuth.not, registrationController.registerIntructor);

module.exports = router;
