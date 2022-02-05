const LocalStrategy = require('passport-local').Strategy;
const executeQuery = require('../models/executeQuery');
const bcrypt = require('bcrypt');

const getUserByName = async (username, dbTable) => {
    // console.log(`BYNAME: SELECT ID, USERNAME, PASSWORD FROM ${dbTable} WHERE USERNAME=:username`);
    result = await executeQuery(`SELECT ID, USERNAME, PASSWORD FROM ${dbTable} WHERE USERNAME=:username`, [username]);
    if (result.rows.length != 0) return result.rows[0];
    else return null;
};
const getUserById = async (id, dbTable) => {
    // console.log(`BYID: SELECT ID, USERNAME, PASSWORD FROM ${dbTable} WHERE ID=:id`);
    result = await executeQuery(`SELECT ID, USERNAME, PASSWORD FROM ${dbTable} WHERE ID=:id`, [id]);
    if (result.rows.length != 0) return result.rows[0];
    else return null;
};
const authenticateUser = async (req, username, password, done) => {
    // console.log('Authentication called');
    const dbtable = req.url.includes('instructor') ? 'INSTRUCTORS' : 'STUDENTS';
    const user = await getUserByName(username, dbtable);
    if (user == null) return done(null, false, { message: 'No user found with this name' });
    try {
        if (await bcrypt.compare(password, user.PASSWORD)) return done(null, user);
        else return done(null, false, { message: 'Password incorrect' });
    } catch (err) {
        console.log(err);
        return done(err);
    }
};
const initialize = (passport) => {
    passport.use(
        new LocalStrategy(
            { usernameField: 'username', passwordField: 'password', passReqToCallback: true },
            authenticateUser
        )
    );
    passport.serializeUser((user, done) => done(null, user.ID));
    passport.deserializeUser(async (req, id, done) => {
        const dbTable = req.url.includes('instructor') ? 'INSTRUCTORS' : 'STUDENTS';
        const user = await getUserById(id, dbTable);
        done(null, user);
    });
};
module.exports = initialize;
