
const { Client } = require('pg');
const CONNECTION_STRING = 'postgres://karoapez:mjDG4jhxI7rXKUGDoSPdNoQoU4nYW1h6@john.db.elephantsql.com:5432/karoapez';

function connect() {
    const client = new Client({
        connectionString: CONNECTION_STRING,
    });
    client.connect();
    return client;
};

function resetTable(callback) {
    const client = connect();
    const query = `
    DROP TABLE IF EXISTS lecture, technician;

    CREATE TABLE lecture (
        ID SERIAL PRIMARY KEY,
        semesterId BIGINT NOT NULL,
        lectureId BIGINT UNIQUE NOT NULL, 
        facultyId BIGINT NOT NULL,
        dayOfWeek INT NOT NULL,
        startTime TIME NOT NULL,
        endTime TIME NOT NULL
    );

    CREATE TABLE technician (
        ID SERIAL PRIMARY KEY,
        technicianId BIGINT UNIQUE NOT NULL,
        semesterId BIGINT NOT NULL, 
        facultyId BIGINT NOT NULL,
        dayOfWeek INT NOT NULL,
        startTime TIME NOT NULL,
        endTime TIME NOT NULL
    );
    `
    client.query(query, (err, result) => {
        client.end()
        callback(err, result);
    });
};

function lectureTable() {
    const client = connect();
    const query = `
        CREATE TABLE lecture (
            ID SERIAL PRIMARY KEY,
            semesterId BIGINT NOT NULL,
            lectureId BIGINT UNIQUE NOT NULL, 
            facultyId BIGINT NOT NULL,
            dayOfWeek INT NOT NULL,
            startTime TIME NOT NULL,
            endTime TIME NOT NULL
        )`;

    client.query(query, (err, res) => {
        console.log(err, res);
        client.end();
    });
};

function technicianTable() {
    const client = connect();
    const query = `
        CREATE TABLE technician (
            ID SERIAL PRIMARY KEY,
            technicianId BIGINT UNIQUE NOT NULL,
            semesterId BIGINT NOT NULL, 
            facultyId BIGINT NOT NULL,
            dayOfWeek INT NOT NULL,
            startTime TIME NOT NULL,
            endTime TIME NOT NULL
        )`;

    client.query(query, (err, res) => {
        console.log(err, res);
        client.end();
    });
};

function insertLecture(lectures, callback) {
    let i = 1;
    const template = lectures.map((lecture) => `($${i++},$${i++},$${i++},$${i++},$${i++},$${i++})`).join(',');
    const values = lectures.reduce((reduced, lecture) => [...reduced, lecture.semesterId, lecture.lectureId, lecture.facultyId, lecture.dayOfWeek, lecture.startTime, lecture.endTime], []);
    const query = `INSERT INTO lecture (semesterId, lectureId, facultyId, dayOfWeek, startTime, endTime) VALUES ${template};`;

    //test the database in VS code 
    // console.log(values, query);

    const client = connect();
    client.query(query, values, (err, result) => {
        callback(err, result);
        client.end();
    });
};

function insertTechnician(technicians, callback) {
    let i = 1;
    const template = technicians.map((technician) => `($${i++},$${i++},$${i++},$${i++},$${i++},$${i++})`).join(',');
    const values = technicians.reduce((reduced, technician) => [...reduced, technician.technicianId, technician.semesterId, technician.facultyId, technician.dayOfWeek, technician.startTime, technician.endTime], []);
    const query = `INSERT INTO technician (technicianId, semesterId, facultyId, dayOfWeek, startTime, endTime) VALUES ${template};`;

    //test the database in VS code 
    console.log(values, query);

    const client = connect();
    client.query(query, values, (err, result) => {
        callback(err, result);
        client.end();
    });
};

function getLecture(facultyId, semesterId, page = 0, pageSize, callback) {
    let whereClause;
    let i = 1;
    const values = [];
    if (!facultyId && !semesterId) whereClause = '';
    else {
        whereClause = `WHERE `;
        if (facultyId) {
            whereClause += `facultyid = $${i++} `;
            values.push(parseInt(facultyId));
        }
        if (semesterId) {
            whereClause += (facultyId) ? ` AND semesterid =  $${i++} ` : `semesterid =  $${i++}`;
            values.push(parseInt(semesterId));
        }
    }

    let limitOffsetClause = '';
    if (pageSize) {
        limitOffsetClause = `LIMIT $${i++} OFFSET $${i++}`;
        values.push(parseInt(pageSize)); //limit = page size 
        values.push(parseInt(page) * parseInt(pageSize));
    }
    //how many rows u want to ignore -- offset = page * pageSize
    // const query = `SELECT * FROM lecture ${whereClause} ${limitOffsetClause}`
    const query = `SELECT lecture.lectureId, lecture.semesterId, lecture.facultyId, lecture.dayOfWeek, lecture.startTime, lecture.endTime FROM lecture ${whereClause} ${limitOffsetClause}`
    console.log(query);

    const client = connect();
    client.query(query, values, function (err, result) {
        // console.log(err,result); //checking purpose
        const rows = result.rows;
        client.end();
        callback(err, rows);
    });

    //request in terminal 
    console.log(query, values);
    // callback(null, { ok: 'ok' });
    // //         |        |
    // //        error    response
};

function getTechnician(facultyId, semesterId, dayOfWeek, page = 0, pageSize, callback) {
    let whereClause;
    let i = 1;
    const values = [];
    if (!facultyId && !semesterId && !dayOfWeek) whereClause = '';
    else {
        whereClause = `WHERE `;
        if (facultyId) {
            whereClause += `facultyid = $${i++} `;
            values.push(parseInt(facultyId));
        }
        if (semesterId) {
            whereClause += (facultyId) ? ` AND semesterid =  $${i++} ` : `semesterid =  $${i++}`;
            values.push(parseInt(semesterId));
        }
        if (dayOfWeek) {
            whereClause += (facultyId, semesterId) ? ` AND dayofweek =  $${i++} ` : `dayofweek =  $${i++}`;
            values.push(parseInt(dayOfWeek));
        }
    }

    let limitOffsetClause = '';
    if (pageSize) {
        limitOffsetClause = `LIMIT $${i++} OFFSET $${i++}`;
        values.push(parseInt(pageSize)); //limit = page size 
        values.push(parseInt(page) * parseInt(pageSize));
    }

    const query = `SELECT technician.technicianId, technician.semesterId, technician.facultyId, technician.dayOfWeek, technician.startTime, technician.endTime FROM technician ${whereClause} ${limitOffsetClause}`
    console.log(query);

    const client = connect();
    client.query(query, values, function (err, result) {
        // console.log(err, result); //checking purpose
        const rows = result.rows;
        client.end();
        callback(err, rows);
    });

    //request in terminal 
    console.log(query, values);
    // callback(null, { ok: 'ok' });
    // //         |        |
    // //        error    response
};

function getDayLecture(facultyId, semesterId, dayOfWeek, callback) {
    let whereClause;
    let i = 1;
    const values = [];
    if (!facultyId && !semesterId && !dayOfWeek) whereClause = '';
    else {
        whereClause = `WHERE `;
        if (facultyId) {
            whereClause += `facultyid = $${i++} `;
            values.push(parseInt(facultyId));
        }
        if (semesterId) {
            whereClause += (facultyId) ? ` AND semesterid =  $${i++} ` : `semesterid =  $${i++} `;
            values.push(parseInt(semesterId));
        }
        if (dayOfWeek) {
            whereClause += (facultyId, semesterId) ? ` AND dayofweek =  $${i++} ` : `dayofweek =  $${i++}`;
            values.push(parseInt(dayOfWeek));
        }
    };

    const query = `SELECT lecture.lectureId, lecture.startTime, lecture.endTime FROM lecture ${whereClause} `
    console.log(query);

    const client = connect();
    client.query(query, values, function (err, result) {
        // console.log(err,result); //checking purpose
        client.end();
        if (err) return callback(err, result);
        const { rows } = result;
        if (callback) callback(err, rows);
    });

    //request in terminal 
    console.log(query, values);
    // callback(null, { ok: 'ok' });
    // //         |        |
    // //        error    response
}

function getDayTechnicianAndLectures(facultyId, semesterId, dayOfWeek, callback) {
    let whereClause;
    let i = 1;
    const values = [];
    if (!facultyId && !semesterId && !dayOfWeek) whereClause = '';
    else {
        whereClause = `WHERE `;
        if (facultyId) {
            whereClause += `facultyid = ${facultyId} `;
            values.push(parseInt(facultyId));
        }
        if (semesterId) {
            whereClause += (facultyId) ? ` AND semesterid =  ${semesterId} ` : `semesterid =  ${semesterId} `;
            values.push(parseInt(semesterId));
        }
        if (dayOfWeek) {
            whereClause += (facultyId, semesterId) ? ` AND dayofweek =  ${dayOfWeek} ` : `dayofweek =  ${dayOfWeek}`;
            values.push(parseInt(dayOfWeek));
        }
    };

    const query = `SELECT technicianId, startTime, endTime FROM technician ${whereClause} ; SELECT lectureId, startTime, endTime FROM lecture ${whereClause} ;`
    console.log(query);

    const client = connect();
    client.query(query, function (err, result) {
        // console.log(err,result); //checking purpose
        client.end();
        if (err) return callback(err, result);
        const { rows: technicianRows } = result[0];
        const { rows: lectureRows } = result[1];
        if (callback) callback(err, technicianRows, lectureRows);
    });

    //request in terminal 
    // console.log(query, values);
    // callback(null, { ok: 'ok' });
    // //         |        |
    // //        error    response
};


module.exports = {
    resetTable,
    lectureTable,  //lecture table
    technicianTable,
    insertLecture,
    insertTechnician,
    getLecture, //basic data
    getTechnician, //advance data
    getDayLecture,  //basic result
    getDayTechnicianAndLectures //advance result 
};

