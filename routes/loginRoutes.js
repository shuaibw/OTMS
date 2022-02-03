const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const checkAuth = require('../controller/checkAuth');
router.route('/').get(checkAuth.is, async (req, res) => {
    res.sendFile(path.resolve('frontend/home.html'));
});
router.route('/login').get(checkAuth.not, async (req, res) => {
    res.sendFile(path.resolve('frontend/index.html'));
});
//post to be added

module.exports = router;
