const executeQuery = require('../models/executeQuery');
const bcrypt = require('bcrypt');
const oracledb = require('oracledb');

exports.registerIntructor = async (req, res) => {
    const data = req.body;

    const instructor_insert = `INSERT INTO INSTRUCTORS 
(NAME, LOCATION, EMAIL, USERNAME, PASSWORD, PHONE, AGE, GENDER, INSTITUTION, YEAR, DEPARTMENT)
    VALUES 
(:fullname, :location, :email, :username, :password, :phone, :age, :gender, :institution, :year, :department) RETURNING ID INTO :emp_id`;
    const hashedPwd = await bcrypt.hash(data.password, 10);
    const instructor_binds = {
        fullname: data.fullname,
        location: data.location,
        email: data.email,
        username: data.username,
        password: hashedPwd,
        phone: data.phone,
        age: data.age,
        gender: data.gender,
        institution: data.institution,
        year: data.year,
        department: data.department,
        emp_id: { dir: oracledb.BIND_OUT },
    };
    const teaches_insert = `INSERT INTO TEACHES 
(INSTRUCTOR_ID, SUBJECT_NAME)
    VALUES
(:iid, :subname)`;
    // console.log(data);
    try {
        const result = await executeQuery(instructor_insert, instructor_binds, {});
        if (!result) throw 'Error inserting instructors';
        const emp_id = result.outBinds.emp_id[0];
        for (const subject of data.selectedSubjects) {
            let teaches_binds = { iid: emp_id, subname: subject.toLowerCase() };
            const result = await executeQuery(teaches_insert, teaches_binds, {});
            if (!result) throw 'Error relating subjects with instructors';
        }
        res.redirect('http://localhost:3000/login/instructor');
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
