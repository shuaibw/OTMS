const express = require('express');
const router = express.Router();
const path = require('path');
const checkAuth = require('../controller/checkAuth');

router.route('/').get(checkAuth.is, async (req, res) => {
    res.render(path.resolve('frontend/home.ejs'));
});

router.route('/instructor').get(checkAuth.is, async (req, res) => {
    res.render(path.resolve('frontend/instHome.ejs'), { instName: req.user.USERNAME });
});

module.exports = router;
