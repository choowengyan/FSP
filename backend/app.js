var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const database = require('./database');
const backend = require('./backend');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//-----------------------------
//      Service Request
//-----------------------------

app.get('/', (req, res) => {
  return res.json({
    message: "Welcome to JiBaBoom - 2a14 - monkeys",
    availableEndpoints: [
      'POST /basic/insert { "data": [ {semesterId: 1110000000, lectureId: 1000000001, facultyId: 1100000000, dayOfWeek: 1, startTime: "10:00", endTime: "11:00"  } ] }',
      'POST /advance/insert { "data": [ {technicianId: 9000000001, semesterId: 9990000007, facultyId: 9900000001, dayOfWeek: 1, startTime: "10:00", endTime: "11:00" } ] }',
      'GET /basic/data?semesterId=1110000000&facultyId=1100000000',
      'GET /advance/data?semesterId=9999999999&facultyId=9999999999',
      'GET /basic/result?facultyId=1100000000&semesterId=1110000000&dayOfWeek=1',
      'GET /advance/result?semesterId=1110000000&facultyId=1100000000&dayOfWeek=4',
    ]
  });
});

//RESET TABLE
app.get('/reset', function (req, res) {
  database.resetTable(function (error, result) {
    if (error) {
      console.log(error);
      return res.json({ error: error });
    }
    return res.json({ success: true });
  });
});

//INSERT DATA
app.post('/basic/insert', function (req, res, next) {
  const { data } = req.body;
  database.insertLecture(data, (error, result) => {
    if (error) {
      return next(error);
    }
    res.json(
      { "result": "success" });
  });
});

//INSERT ADVANCE DATA (TECHNICIAN)
app.post('/advance/insert', function (req, res, next) {
  const { data } = req.body;
  database.insertTechnician(data, (error, result) => {
    if (error) {
      return next(error);
    }
    res.json(
      { "result": "success" });
  });
});

//GET RESULT 
app.get('/basic/data', function (req, res, next) {
  //filtering 
  const { facultyId, semesterId, page, pageSize } = req.query;
  //send the function to the backend 
  database.getLecture(facultyId, semesterId, page, pageSize, (error, result) => {
    if (error) {
      return next(error);
    } else {
      //no records found 
      if (result.length == 0) {
        statusCode = 404;
        res.json({
          "error": "No Records Found",
          code: 404
        });
      }
      //successful 
      else {
        res.json(result);
      }
    }

  });
});

// GET ADVANCE DATA
app.get('/advance/data', function (req, res, next) {
  //filtering 
  const { facultyId, semesterId, dayOfWeek, page, pageSize } = req.query;
  //send the function to the backend 
  database.getTechnician(facultyId, semesterId, dayOfWeek, page, pageSize, (error, result) => {
    if (error) {
      return next(error);
    } else {
      //no records found 
      if (result.length == 0) {
        statusCode = 404;
        res.json({
          "error": "No Records Found",
          code: 404
        });
      }
      //successful 
      else {
        res.json(result);
      }
    }
  });
});

// GET RESULT ( incld dayofweek)
app.get('/basic/result', function (req, res, next) {
  //filtering 
  const { facultyId, semesterId, dayOfWeek } = req.query;
  //send the function to the backend 
  database.getDayLecture(facultyId, semesterId, dayOfWeek, (error, result) => {
    const sortResult = backend.minHalls(result);
    if (error) {
      return next(error);
    } else {
      if (!facultyId || !semesterId || !dayOfWeek) {
        res.json({
          "error": "Expected Error due to Missing Field or Invalid Data",
          code: 422
        });
      } else {
        return res.json({
          result: sortResult,
        });
      }
    }
  });
});

// GET ADVANCE RESULT (for technician)
app.get('/advance/result', function (req, res, next) {
  //filtering 
  const { facultyId, semesterId, dayOfWeek } = req.query;
  //send the function to the backend 
  database.getDayTechnicianAndLectures(facultyId, semesterId, dayOfWeek, (error, technicianRows, lectureRows) => {
    if (error) {
      return next(error);
    } else {
      const sortResult = backend.merge(technicianRows, lectureRows);
      if (!facultyId || !semesterId || !dayOfWeek) {
        res.json({
          "error": "Expected Error due to Missing Field",
          code: 422
        });
      } else {

        return res.json({
          result: sortResult,
        });
      }
    }
  });
});




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    error: err.message,
    code: err.status || 500,
  });
});

module.exports = app;
