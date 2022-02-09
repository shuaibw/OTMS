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
        // res.sendFile(path.resolve('frontend/login.html'));
        res.render(path.resolve('frontend/login.ejs'), {
            welcomeMsg: 'Welcome Learner!',
            backgroundGrad: 'background-image: linear-gradient(to right top, #b7f9f8, #b1f1ff, #c0e5ff, #ddd7ff, #f9c8f1);',
            askMsg: 'Are you an instructor?',
            // Route to instructor login upon clicking Not a student
            toInstRoute: '/login/instructor',
            // POST to /login upon clicking login
            onSubmitRoute: '/login',
        });
    })
    .post(
        checkAuth.not,
        passport.authenticate('local', {
            successRedirect: '/home',
            failureRedirect: '/login',
            failureFlash: true,
        })
    );
router
    .route('/login/instructor')
    .get(checkAuth.not, async (req, res) => {
        res.render(path.resolve('frontend/login.ejs'), {
            welcomeMsg: 'Welcome Instructor!',
            backgroundGrad: 'background-image: linear-gradient(to left bottom, #ffffff, #e0dafe, #bfb5fb, #9d92f7, #776ff2);',
            askMsg: 'Are you a student?',
            toInstRoute: '/login',
            // POST to /login/instructor upon clicking login
            onSubmitRoute: '/login/instructor',
        });
    })
    .post(
        checkAuth.not,
        passport.authenticate('local', {
            successRedirect: '/home/instructor',
            failureRedirect: '/login/instructor',
            failureFlash: true,
            successMessage: 'shuaib',
        })
    );
module.exports = router;
