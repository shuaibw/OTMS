const express = require('express');
const router = express.Router();
const checkAuth = require('../controller/checkAuth');
const path = require('path');
const executeQuery = require('../models/executeQuery');
router.route('/:subject/instructors').get(checkAuth.is, checkAuth.isStudent, async (req, res) => {
    let subject = req.params.subject;
    const query = `SELECT NAME, INSTITUTION, DEPARTMENT, YEAR, EMAIL,PHONE
    FROM INSTRUCTORS I,
         TEACHES T
    WHERE I.ID = T.INSTRUCTOR_ID and T.SUBJECT_NAME = :subject`;
    const bind = { subject: subject };
    const result = await executeQuery(query, bind, {});
    // console.log(result.rows);
    if (subject === 'ict') subject = 'ICT';
    else subject = subject.charAt(0).toUpperCase() + subject.slice(1);
    res.render(path.resolve('frontend/list-instructors-bysubjects.ejs'), {
        instructors: result.rows,
        title: `Meet our ${subject} instructors!`,
        subject: subject,
    });
});

module.exports = router;
