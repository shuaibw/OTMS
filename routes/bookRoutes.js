const express = require('express');
const router = express.Router();
const checkAuth = require('../controller/checkAuth');
const path = require('path');
const queries = require('../models/queries');

router.route('/:sid/:iid/:subject/:type/:status').get(checkAuth.is, checkAuth.isStudent, async (req, res) => {
    const sid = req.params.sid;
    const iid = req.params.iid;
    let subject = req.params.subject.toLowerCase();
    const status = req.params.status;
    const type = req.params.type;
    const booking_id = await queries.createBooking(subject, type, status);
    const result = await queries.insertBooks(booking_id, sid, iid);
    if (!result) {
        console.log('🚀 ~ file: bookRoutes.js ~ line 17 ~ router.route ~ result', result);
    }
    const successMsg = 'Booking confirmed! Please check your dashboard.';
    res.redirect(`/${subject}/instructors/${successMsg}`);
});

module.exports = router;
