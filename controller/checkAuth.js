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

exports.isInstructor = (req, res, next) => {
    if (req.session.isInstructor) return next();
    res.redirect('/home');
};
exports.isStudent = (req, res, next) => {
    if (!req.session.isInstructor) return next();
    res.redirect('/home/instructor');
};
