const { exec } = require('child_process');
const express = require('express');
const router = express.Router();
const path = require('path');
const checkAuth = require('../controller/checkAuth');
const queries = require('../models/queries');

router.route('/').get(checkAuth.is, checkAuth.isStudent, async (req, res) => {
    res.render(path.resolve('frontend/home.ejs'));
});

router.route('/instructor').get(checkAuth.is, checkAuth.isInstructor, async (req, res) => {
    // console.log(req.user);
    const result = await queries.selectInstructorByID(req.user.ID);
    // console.log("🚀 ~ file: homeRoutes.js ~ line 15 ~ router.route ~ result", result)
    res.render(path.resolve('frontend/instructor-edit.ejs'), result.rows[0]);
});

module.exports = router;
