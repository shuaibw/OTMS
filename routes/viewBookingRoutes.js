const express = require('express');
const router = express.Router();
const checkAuth = require('../controller/checkAuth');
const path = require('path');
const queries = require('../models/queries');
const utils = require('../models/utils');
router.route('/student').get(checkAuth.is, checkAuth.isStudent, async (req, res) => {
    const bookings = await queries.getBookingsForStudent(req.user.ID);
    res.render(path.resolve('frontend/student-bookings.ejs'), { data: bookings.rows });
});
router.route('/instructor').get(checkAuth.is, checkAuth.isInstructor, async (req, res) => {
    const bookings = await queries.getBookingsForInstructor(req.user.ID);
    res.render(path.resolve('frontend/instructor-bookings.ejs'), { data: bookings.rows });
});
module.exports = router;
