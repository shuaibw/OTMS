const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;
let connection;

const executeQuery = async (query, binds, options) => {
    if (!connection) {
        connection = await oracledb.getConnection({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectionString: process.env.DB_CONNSTR,
        });
    }
    try {
        let result = await connection.execute(query, binds, options);
        return result;
    } catch (err) {
        console.log('🚀 ~ file: executeQuery.js ~ line 18 ~ executeQuery ~ err', err);
    }
};
module.exports = executeQuery;
