exports.is = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('http://localhost:3000/login');
};

exports.not = (req, res, next) => {
    if (req.isAuthenticated()) return res.redirect('http://localhost:3000/home');
    next();
};
