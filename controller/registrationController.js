const executeQuery = require('../models/executeQuery');
const bcrypt = require('bcrypt');

exports.registerIntructor = async (req, res) => {
    const query = `INSERT INTO INSTRUCTORS 
(NAME, LOCATION, EMAIL, USERNAME, PASSWORD, PHONE, AGE, GENDER, INSTITUTION, YEAR, DEPARTMENT)
    VALUES 
(:fullname, :location, :email, :username, :password, :phone, :age, :gender, :institution, :year, :department)`;
    const data = req.body;
    console.log(data);
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
            data.institution,
            data.year,
            data.department,
        ]);
        console.log(result);
        if (result) res.redirect('http://localhost:3000/login');
        else res.redirect('http://localhost:3000/register');
    } catch (err) {
        console.log(err);
        res.redirect('http://localhost:3000/register');
    }
};

exports.registerStudent = async (req, res) => {
    const query = `INSERT INTO STUDENTS 
(NAME, LOCATION, EMAIL, USERNAME, PASSWORD, PHONE, AGE, GENDER, SCHOOL, GRADE, FACULTY, VERSION)
    VALUES 
(:fullname, :location, :email, :username, :password, :phone, :age, :gender, :school, :grade, :faculty, :version)`;
    const data = req.body;
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
