require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const multer = require('multer');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const loginRouter = require('./routes/loginRoutes');
const registrationRouter = require('./routes/registrationRoutes');
const homeRouter = require('./routes/homeRoutes');
const logoutRouter = require('./routes/logoutRoutes');
const subjectRouter = require('./routes/subjectRoutes');
const bookRouter = require('./routes/bookRoutes');
const viewBookRoutes = require('./routes/viewBookingRoutes');
const matUploadRouter = require('./routes/uploadMatRoutes');
const updateProfileRouter = require('./routes/updateProfileRoutes');
const initializePassport = require('./controller/passport-config');
initializePassport(passport);

const app = express();
app.set('view-engine', 'ejs');
app.use(express.static('frontend'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().array());
app.use(morgan('dev'));

app.use(flash());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        // cookie: { maxAge: 10000 }, yebboy
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(loginRouter);
app.use('/register', registrationRouter);
app.use('/home', homeRouter);
app.use('/book', bookRouter);
app.use(subjectRouter);
app.use('/bookings', viewBookRoutes);
app.use('/logout', logoutRouter);
app.use('/upload', matUploadRouter);
app.use('/update', updateProfileRouter);

app.listen(3000, () => {
    console.log('Server listeing at 3000');
});
