exports.is = (req, res, next) => {
    // console.log(req.isAuthenticated() + ' ' + req.url);
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
};

exports.not = (req, res, next) => {
    // console.log(req.isAuthenticated() + ' ' + req.url);
    if (req.isAuthenticated()) return res.redirect('/home');
    next();
};
