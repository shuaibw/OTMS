const express = require('express');
const router = express.Router();
const path = require('path');
const checkAuth = require('../controller/checkAuth');
router
    .route('/')
    .get(checkAuth.is, async (req, res) => {
        res.render(path.resolve('frontend/home.ejs'));
    })
    .post((req, res) => {
        res.sendStatus('200').send('To be implemented');
    });

module.exports = router;