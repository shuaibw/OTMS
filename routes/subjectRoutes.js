const express = require('express');
const router = express.Router();
const checkAuth = require('../controller/checkAuth');
const path = require('path');
const queries = require('../models/queries');
const utils = require('../models/utils');
router.route('/:subject/instructors/:successMsg?').get(checkAuth.is, checkAuth.isStudent, async (req, res) => {
    let subject = req.params.subject;
    const result = await queries.getInstructorsBySubject(subject);
    if (subject === 'ict') subject = 'ICT';
    else subject = subject.charAt(0).toUpperCase() + subject.slice(1);
    res.render(path.resolve('frontend/list-instructors-bysubjects.ejs'), {
        instructors: result.rows,
        title: `Meet our ${subject} instructors!`,
        successMsg: req.params.successMsg,
        subject: subject,
        sid: req.user.ID,
    });
});

router.route('/:subject/uploads').get(checkAuth.is, checkAuth.isStudent, async (req, res) => {
    let subject = req.params.subject;
    const result = await queries.getMaterialsBySubject(subject);
    const data = result.rows;
    // console.log('🚀 ~ file: subjectRoutes.js ~ line 23 ~ router.route ~ data', data);

    for (const x of data) {
        x.LINK = utils.extractIDfromLink(x.LINK);
    }
    // console.log("🚀 ~ file: subjectRoutes.js ~ line 23 ~ router.route ~ data", data)
    res.render(path.resolve('frontend/view-uploads-bysub.ejs'), { data: data, subject: subject });
});

module.exports = router;
