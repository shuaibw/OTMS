const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const checkAuth = require('../controller/checkAuth');
router.route('/').get(checkAuth.is, async (req, res) => {
    res.redirect('/login');
});
router
    .route('/login')
    .get(checkAuth.not, async (req, res) => {
        res.sendFile(path.resolve('frontend/login.html'));
    })
    .post(
        checkAuth.not,
        passport.authenticate('local', {
            successRedirect: '/home',
            failureRedirect: '/login',
            failureFlash: true,
        })
    );
//post to be added

module.exports = router;
