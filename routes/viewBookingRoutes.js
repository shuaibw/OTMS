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
router.route('/instructor/accept/:booking_id').get(checkAuth.is, checkAuth.isInstructor, async (req, res) => {
    const bid = req.params.booking_id;
    const result = await queries.updateBookingStatus(bid, 'pending-payment');
    res.redirect('/bookings/instructor');
});
router.route('/student/pay').post(checkAuth.is, checkAuth.isStudent, async (req, res) => {
    const trx_id = req.body.trx_id;
    const phone_number = req.body.phone_number;
    const booking_id = req.body.booking_id;
    const pay_amount = req.body.pay_amount;
    const pay_medium = req.body.pay_medium;
    const createPayResult = await queries.createPayment(trx_id, pay_amount, pay_medium, phone_number);
    const bookTrxResult = await queries.updateBookingTrx(booking_id, trx_id);
    const updateBookResult = await queries.updateBookingStatus(booking_id, 'Payment Complete');
    res.redirect('/bookings/student');
});

router.route('/student/cancel/:booking_id').get(checkAuth.is, checkAuth.isStudent, async (req, res) => {
    const booking_id = req.params.booking_id;
    const result = await queries.updateBookingStatus(booking_id, 'student'); //set marker to find out who deleted
    await queries.deleteBooking(booking_id);
    res.redirect('/bookings/student');
});

router.route('/instructor/cancel/:booking_id').get(checkAuth.is, checkAuth.isInstructor, async (req, res) => {
    const booking_id = req.params.booking_id;
    const result = await queries.updateBookingStatus(booking_id, 'instructor'); //set marker to find out who deleted
    await queries.deleteBooking(booking_id);
    res.redirect('/bookings/instructor');
});
module.exports = router;
