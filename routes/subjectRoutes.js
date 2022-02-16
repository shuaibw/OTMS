const express = require('express');
const router = express.Router();
const checkAuth = require('../controller/checkAuth');
const path = require('path');
const queries = require('../models/queries');
router.route('/:subject/instructors').get(checkAuth.is, checkAuth.isStudent, async (req, res) => {
    let subject = req.params.subject;
    const result = await queries.getInstructorsBySubject(subject);
    if (subject === 'ict') subject = 'ICT';
    else subject = subject.charAt(0).toUpperCase() + subject.slice(1);
    res.render(path.resolve('frontend/list-instructors-bysubjects.ejs'), {
        instructors: result.rows,
        title: `Meet our ${subject} instructors!`,
        subject: subject,
    });
});

module.exports = router;
