const express = require('express');
const router = express.Router();
const path = require('path');
const checkAuth = require('../controller/checkAuth');
const queries = require('../models/queries');
const utils = require('../models/utils');

router
    .route('/')
    .get(checkAuth.is, checkAuth.isInstructor, async (req, res) => {
        const subjectsTaught = await queries.getSubjectsByInstructor(req.user.USERNAME);
        // console.log('🚀 ~ file: uploadMatRoutes.js ~ line 11 ~ .get ~ subjectsTaught', subjectsTaught);
        res.render(path.resolve('frontend/upload-materials.ejs'), { data: subjectsTaught.rows, success: false });
    })
    .post(checkAuth.is, checkAuth.isInstructor, async (req, res) => {
        const iid = req.user.ID;
        const sid = req.body.subject_id;
        const vid_link = req.body.video_link;
        const title = req.body.title;
        const result = await queries.insertMaterial(iid, sid, title, vid_link);
        if (result == null) res.redirect('/');
        const subjectsTaught = await queries.getSubjectsByInstructor(req.user.USERNAME);
        res.render(path.resolve('frontend/upload-materials.ejs'), { data: subjectsTaught.rows, success: true });
    });
router.route('/view').get(checkAuth.is, checkAuth.isInstructor, async (req, res) => {
    const materials = await queries.getMaterialsByInstructor(req.user.ID);
    const data = materials.rows;
    // console.log('🚀 ~ file: uploadMatRoutes.js ~ line 29 ~ router.route ~ data', data);
    for (const x of data) {
        x.LINK = utils.extractIDfromLink(x.LINK);
    }
    res.render(path.resolve('frontend/view-uploads.ejs'), { data: data });
});

module.exports = router;
