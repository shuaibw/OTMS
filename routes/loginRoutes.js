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
            askMsg: 'Not a student?',
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
            askMsg: 'Not an instructor?',
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
