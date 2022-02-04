const router = require('express').Router();

router.route('/').post((req, res) => {
    req.logOut();
    res.redirect('/login');
});
module.exports = router;
