const express = require('express');
const router = express.Router();
const checkAuth = require('../controller/checkAuth');
const path = require('path');
const queries = require('../models/queries');
const utils = require('../models/utils');

router.route('/instructor/info').post(checkAuth.is, checkAuth.isInstructor, async (req, res) => {
    queries.updateInstructorProfile(req.user.ID, req.body);
    res.redirect('/home/instructor');
});
router.route('/instructor/info').post(checkAuth.is, checkAuth.isInstructor, async (req, res) => {
    console.log('To be implemented');
    res.redirect('/home/instructor');
});
module.exports = router;
