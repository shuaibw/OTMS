const executeQuery = require('./executeQuery');
const bcrypt = require('bcrypt');
const oracledb = require('oracledb');

const createAddr = async (city, district) => {
    const query = `INSERT INTO ADDRESS 
    (city, district) 
    VALUES (:city, :district) 
    RETURNING ID INTO :addr_id`;
    const binds = {
        city: city,
        district: district,
        addr_id: { dir: oracledb.BIND_OUT },
    };
    const result = await executeQuery(query, binds, {});
    // console.log('🚀 ~ file: queries.js ~ line 16 ~ createAddr ~ result', result);
    const addr_id = result.outBinds.addr_id[0];
    return addr_id;
};
const getSubjectID = async (subjectName) => {
    const query = 'SELECT ID FROM SUBJECTS WHERE SUBJECT_NAME=:subject_name';
    const binds = {
        subject_name: subjectName.toLowerCase(),
    };
    const result = await executeQuery(query, binds, {});
    if (result.rows.length == 0) {
        console.log('🚀 ~ file: queries.js ~ line 30 ~ getSubjectID ~ result', result);
        return null;
    }
    return result.rows[0].ID;
};
const getAddressByID = async (ADDR_ID) => {
    const query = `SELECT CITY, DISTRICT FROM ADDRESS WHERE ID=:addr_id`;
    const binds = {
        addr_id: ADDR_ID,
    };
    const result = await executeQuery(query, binds, {});
    if (!result) {
        console.log('🚀 ~ file: queries.js ~ line 40 ~ getAddressByID ~ result', result);
    }
    return result;
};
exports.insertStudent = async (data) => {
    const addr_id = await createAddr(data.city, data.district);
    if (addr_id == null) {
        console.log('🚀 ~ file: queries.js ~ line 23 ~ exports.insertStudent= ~ addr_id', addr_id);
        return null;
    }

    const query = `INSERT INTO STUDENTS 
(NAME, ADDR_ID, EMAIL, USERNAME, PASSWORD, PHONE, AGE, GENDER, SCHOOL, GRADE, FACULTY, VERSION)
    VALUES 
(:fullname, :addr_id, :email, :username, :password, :phone, :age, :gender, :school, :grade, :faculty, :version)`;
    try {
        const hashedPwd = await bcrypt.hash(data.password, 10);
        const student_binds = {
            fullname: data.fullname,
            addr_id: addr_id,
            email: data.email,
            username: data.username,
            password: hashedPwd,
            phone: data.phone,
            age: data.age,
            gender: data.gender,
            school: data.school,
            grade: data.grade,
            faculty: data.faculty,
            version: data.version,
        };
        const result = await executeQuery(query, student_binds, {});
        // console.log('🚀 ~ file: queries.js ~ line 48 ~ exports.insertStudent= ~ result', result);
        return result;
    } catch (err) {
        console.log('🚀 ~ file: queries.js ~ line 53 ~ exports.insertStudent= ~ err', err);
    }
};

exports.insertInstructor = async (data) => {
    const addr_id = await createAddr(data.city, data.district);
    if (addr_id == null) {
        console.log('🚀 ~ file: queries.js ~ line 58 ~ addr_id', addr_id);
        return null;
    }

    const instructor_insert = `INSERT INTO INSTRUCTORS 
(NAME, ADDR_ID, EMAIL, USERNAME, PASSWORD, PHONE, AGE, GENDER, INSTITUTION, YEAR, DEPARTMENT)
    VALUES 
(:fullname, :addr_id, :email, :username, :password, :phone, :age, :gender, :institution, :year, :department) 
RETURNING ID INTO :emp_id`;
    const hashedPwd = await bcrypt.hash(data.password, 10);
    const instructor_binds = {
        fullname: data.fullname,
        addr_id: addr_id,
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
(INSTRUCTOR_ID, SUBJECT_ID)
    VALUES
(:iid, :subject_id)`;
    // console.log(data);
    const result = await executeQuery(instructor_insert, instructor_binds, {});
    const emp_id = result.outBinds.emp_id[0];
    for (const subject of data.selectedSubjects) {
        const subject_id = await getSubjectID(subject);
        let teaches_binds = { iid: emp_id, subject_id: subject_id };
        const result = await executeQuery(teaches_insert, teaches_binds, {});
        if (!result) return null;
    }
    return result;
};
exports.selectInstructorByID = async (ID) => {
    const instructorQuery = `SELECT NAME, ADDR_ID, EMAIL, USERNAME, PASSWORD, PHONE, AGE, INSTITUTION, DEPARTMENT,
    TO_CHAR(DATE_CREATED, 'DD Mon YYYY') JOIN_DATE
    FROM INSTRUCTORS I WHERE I.ID = :id`;
    const instructorBinds = { id: ID };
    const result = await executeQuery(instructorQuery, instructorBinds, {});
    const ADDR_ID = result.rows[0].ADDR_ID;
    const address = await getAddressByID(ADDR_ID);
    result.rows[0].CITY = address.rows[0].CITY;
    result.rows[0].DISTRICT = address.rows[0].DISTRICT;
    return result;
};

exports.getInstructorsBySubject = async (subject) => {
    const query = `SELECT I.ID, NAME, INSTITUTION, DEPARTMENT, YEAR, EMAIL, PHONE
    FROM INSTRUCTORS I
             JOIN TEACHES T ON (I.ID = T.INSTRUCTOR_ID)
             JOIN SUBJECTS S ON (T.SUBJECT_ID = S.ID AND S.SUBJECT_NAME = :subject)`;
    const bind = { subject: subject };
    const result = await executeQuery(query, bind, {});
    return result;
};

exports.getSubjectsByInstructor = async (username) => {
    const query = `SELECT SUBJECT_NAME, SUBJECT_ID
    FROM INSTRUCTORS I
             JOIN TEACHES T ON (I.ID = T.INSTRUCTOR_ID AND I.USERNAME=:username)
             JOIN SUBJECTS S ON (T.SUBJECT_ID = S.ID)`;
    const bind = { username: username };
    const result = await executeQuery(query, bind, {});
    return result;
};

exports.insertMaterial = async (iid, sid, title, link) => {
    const query = `INSERT INTO MATERIALS (INSTRUCTOR_ID, SUBJECT_ID, TITLE, LINK)
    VALUES (:iid, :sid, :title, :link)`;
    const binds = { iid: iid, sid: sid, title: title, link: link };
    return await executeQuery(query, binds, {});
};

exports.getMaterialsByInstructor = async (iid) => {
    const query = `SELECT TITLE, LINK, SUBJECT_NAME 
    FROM MATERIALS JOIN SUBJECTS ON 
    (INSTRUCTOR_ID = :iid AND SUBJECT_ID=ID)`;
    const binds = { iid: iid };
    return await executeQuery(query, binds, {});
};

exports.getMaterialsBySubject = async (subject) => {
    const query = `SELECT M.TITLE, M.LINK, I.NAME, I.DEPARTMENT, I.INSTITUTION
    FROM SUBJECTS S
             JOIN MATERIALS M ON (S.SUBJECT_NAME = :subject AND S.ID = M.SUBJECT_ID)
             JOIN INSTRUCTORS I ON (I.ID = M.INSTRUCTOR_ID)`;
    const binds = { subject: subject };
    return await executeQuery(query, binds, {});
};

exports.createBooking = async (subject, booking_type, status) => {
    const subject_id = await getSubjectID(subject);
    const query = `INSERT INTO BOOKING (BOOKING_TYPE, BOOKING_SUBJECT_ID, STATUS)
    VALUES (:booking_type, :subject_id, :status)
    RETURNING ID INTO :booking_id`;
    const binds = {
        booking_type: booking_type,
        subject_id: subject_id,
        status: status,
        booking_id: { dir: oracledb.BIND_OUT },
    };
    const result = await executeQuery(query, binds, {});
    if (!result) return null;
    return result.outBinds.booking_id[0];
};

exports.insertBooks = async (booking_id, sid, iid) => {
    const query = `INSERT INTO BOOKS (BOOKING_ID, STUDENT_ID, INSTRUCTOR_ID)
    VALUES (:booking_id, :sid, :iid)`;
    const binds = {
        booking_id: booking_id,
        sid: sid,
        iid: iid,
    };
    return await executeQuery(query, binds, {});
};
