const router = require('express').Router();
const checkAuth = require('../controller/checkAuth');

router.route('/').post(checkAuth.is, (req, res) => {
    req.logOut();
    res.redirect('/login');
});
module.exports = router;
