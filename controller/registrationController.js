const queries = require('../models/queries');

exports.registerIntructor = async (req, res) => {
    const data = req.body;
    const result = await queries.insertInstructor(data);
    if (result) res.redirect('http://localhost:3000/login/instructor');
    else res.redirect('http://localhost:3000/register');
};

exports.registerStudent = async (req, res) => {
    const data = req.body;
    const result = await queries.insertStudent(data);
    if (result) res.redirect('http://localhost:3000/login');
    else res.redirect('http://localhost:3000/register');
};
