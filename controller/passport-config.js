const LocalStrategy = require('passport-local').Strategy;
const executeQuery = require('../models/executeQuery');
const bcrypt = require('bcrypt');

const getUserByName = async (username) => {
    result = await executeQuery(`SELECT ID, USERNAME, PASSWORD FROM STUDENTS WHERE USERNAME=:username`, [username]);

    if (result.rows.length != 0) return result.rows[0];
    else return null;
};
const getUserById = async (id) => {
    console.log(`GetUserByID called ${id}`);
    result = await executeQuery(`SELECT ID, USERNAME, PASSWORD FROM STUDENTS WHERE ID=:id`, [id]);
    if (result.rows.length != 0) return result.rows[0];
    else return null;
};
const authenticateUser = async (username, password, done) => {
    console.log('Authentication called');
    const user = await getUserByName(username);
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
    passport.use(new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.ID));
    passport.deserializeUser(async (id, done) => {
        const user = await getUserById(id);
        done(null, user);
    });
};
module.exports = initialize;
