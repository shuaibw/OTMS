const { exec } = require('child_process');
const express = require('express');
const router = express.Router();
const path = require('path');
const checkAuth = require('../controller/checkAuth');
const executeQuery = require('../models/executeQuery');

router.route('/').get(checkAuth.is, checkAuth.isStudent, async (req, res) => {
    res.render(path.resolve('frontend/home.ejs'));
});

router.route('/instructor').get(checkAuth.is, checkAuth.isInstructor, async (req, res) => {
    // console.log(req.user);
    const query = `SELECT NAME, LOCATION, EMAIL, USERNAME, PASSWORD, PHONE, AGE, INSTITUTION, DEPARTMENT
    FROM INSTRUCTORS I WHERE I.ID = :id`;
    const binds = { id: req.user.ID };
    const result = await executeQuery(query, binds, {});
    res.render(path.resolve('frontend/instructor-edit.ejs'), result.rows[0]);
});

module.exports = router;
