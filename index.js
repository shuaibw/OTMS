const morgan = require('morgan');
const express = require('express');
const multer = require('multer');
const loginRouter = require('./routes/loginRoutes');
const studentRegRouter = require('./routes/stuRegRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().array());
app.use(morgan('dev'));
app.use('/signin', loginRouter);
app.use('/registerStudent', studentRegRouter);

app.listen(3000, () => {
  console.log('Server listeing at 3000');
});
