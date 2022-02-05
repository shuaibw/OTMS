exports.is = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
};

exports.not = (req, res, next) => {
    if (req.isAuthenticated()) return res.redirect('/home');
    next();
};
