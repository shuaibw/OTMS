const executeQuery = require('../models/executeQuery');
const bcrypt = require('bcrypt');

exports.registerIntructor = async (req, res) => {
    const regData = req.body;
    regQuery = `INSERT INTO INSTRUCTORS VALUES(NULL, :full_name, :email, :username, :password)`;
    try {
        const success = await executeQuery(regQuery, [
            regData.full_name,
            regData.email,
            regData.username,
            regData.password,
        ]);
        res.status(200).redirect('http://localhost:5501/frontend/index.html');
    } catch (err) {
        res.status(500).redirect('http://localhost:5501/frontend/newUser.html');
    }
};

exports.registerStudent = async (req, res) => {
    const query = `INSERT INTO STUDENTS (NAME, LOCATION, EMAIL, USERNAME, PASSWORD, PHONE, AGE, GENDER, SCHOOL, GRADE, FACULTY,
    VERSION)
VALUES (:fullname, :location, :email, :username, :password, :phone, :age, :gender, :school,
:grade, :faculty, :version)`;
    data = req.body;
    try {
        const hashedPwd = await bcrypt.hash(data.password, 10);
        const result = await executeQuery(query, [
            data.fullname,
            data.location,
            data.email,
            data.username,
            hashedPwd,
            data.phone,
            data.age,
            data.gender,
            data.school,
            data.grade,
            data.faculty,
            data.version,
        ]);
        console.log(result);
        if (result) res.redirect('http://localhost:3000/login');
        else res.redirect('http://localhost:3000/register');
    } catch (err) {
        console.log(err);
        res.redirect('http://localhost:3000/register');
    }
    console.log(data);
};
