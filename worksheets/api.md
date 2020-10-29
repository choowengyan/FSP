# API Documentation

This document allows you to define your API schema.

Each API should include

1. HTTP Method
2. Endpoint
3. Request body/Parameters
4. Response body
5. Error Body
6. Sample Request
7. Sample Response
8. Sample Error

> Errors and it's corresponding code can be defined by yourself. You need not follow HTTP errors.

## Get Basic Data

| attribute   | value       |
| ----------- | ----------- |
| HTTP Method | GET         |
| Endpoint    | /basic/data |

### Parameters  

| parameter   | datatype        | example     |
| ---------   | --------------- | ------------|
| ID          | SERIAL          | 1           |
| lectureId   | BIGINT          | 1110000001  |
| semesterId  | BIGINT          | 2020100002  |
| facultyId   | BIGINT          | 4110000001  |
| dayOfWeek   | INT             | 1           |
| startTime   | TIME            | "09:00"     |
| endTime     | TIME            | "11:00"     |

### Response Body

```json
{
    "result": [
        {
            "lectureid": STRING,
            "semesterid": STRING,
            "facultyid": STRING,
            "dayofweek": NUMBER,
            "starttime": TIME,
            "endtime": TIME
        },
        ...
    ]
}
```

### Error

```json
{
  "error": STRING,
  "code": ERROR CODE (NUMBER)
}
```

### Sample Request

```http
GET http://localhost:3000/basic/data?semesterId=2020100002&facultyId=4110000001
```

### Sample Response

```json
[
  {
    "lectureid": "1110000016",
    "semesterid": "2020100002",
    "facultyid": "4110000001",
    "dayofweek": 1,
    "starttime": "09:00:00",
    "endtime": "10:30:00"
  },
  {
    "lectureid": "1110000017",
    "semesterid": "2020100002",
    "facultyid": "4110000001",
    "dayofweek": 2,
    "starttime": "08:30:00",
    "endtime": "10:00:00"
  },
  {
    "lectureid": "1110000018",
    "semesterid": "2020100002",
    "facultyid": "4110000001",
    "dayofweek": 3,
    "starttime": "13:00:00",
    "endtime": "15:00:00"
  },
  {
    "lectureid": "1110000019",
    "semesterid": "2020100002",
    "facultyid": "4110000001",
    "dayofweek": 4,
    "starttime": "15:00:00",
    "endtime": "17:00:00"
  },
  {
    "lectureid": "1110000020",
    "semesterid": "2020100002",
    "facultyid": "4110000001",
    "dayofweek": 5,
    "starttime": "09:30:00",
    "endtime": "11:30:00"
  }
]
```

### Sample Error

```json
{
	"error": "Server Error",
	"code": 500
}

{
  "error": "Unexpected token , in JSON at position 150",
  "code": 400
}

{
  "error": "No Records Found",
  "code": 404
}
```

## Insert Basic Data

| attribute   | value         |
| ----------- | -----------   |
| HTTP Method | POST          |
| Endpoint    | /basic/insert |

### Parameters  

| parameter   | datatype        | example     |
| ---------   | --------------- | ------------|
| lectureId   | BIGINT          | 1110000001  |
| semesterId  | BIGINT          | 2020100002  |
| facultyId   | BIGINT          | 4110000001  |
| dayOfWeek   | INT             | 1           |
| startTime   | TIME            | "09:00"     |
| endTime     | TIME            | "11:00"     |

### Response Body

```json
{
    "result": "success"
}
```

### Error

```json
{
  "error": STRING,
  "code": ERROR CODE (NUMBER)
}
```

### Insert Response
```http
POST http://localhost:3000/basic/insert HTTP/1.1
```
### Insert Response

```json
{
  "result": "success"
}
```

### Insert Error

```json
{
  "error": "duplicate key value violates unique constraint \"lecture_lectureid_key\"",
  "code": 500
}

{
  "error": "Unexpected token , in JSON at position 150",
  "code": 400
}

{
  "error": "invalid input syntax for type time: \"a\"",
  "code": 500
}

{
  "error": "invalid input syntax for type time: \"2\"",
  "code": 500
}
```

## Get Advance Data

| attribute   | value         |
| ----------- | -----------   |
| HTTP Method | GET           |
| Endpoint    | /advance/data |

### Parameters  

| parameter   | datatype        | example     |
| ---------   | --------------- | ------------|
| ID          | SERIAL          | 1           |
| technicianId| BIGINT          | 1230000001  |
| semesterId  | BIGINT          | 2020100001  |
| facultyId   | BIGINT          | 4110000001  |
| dayOfWeek   | INT             | 1           |
| startTime   | TIME            | "09:00"     |
| endTime     | TIME            | "11:00"     |

### Response Body

```json
{
    "result": [
        {
            "technicianid": STRING,
            "semesterid": STRING,
            "facultyid": STRING,
            "dayofweek": NUMBER,
            "starttime": TIME,
            "endtime": TIME
        },
        ...
    ]
}

```

### Error

```json
{
  "error": STRING,
  "code": ERROR CODE (NUMBER)
}
```

### Sample Request

```http
GET http://localhost:3000/advance/data?semesterId=9999999999&facultyId=9999999999&dayOfWeek=5 
```

### Sample Response

```json

[
  {
    "technicianid": "9999999999",
    "semesterid": "9999999999",
    "facultyid": "9999999999",
    "dayofweek": 5,
    "starttime": "08:00:00",
    "endtime": "14:00:00"
  }
]
```

### Sample Error

```json
{
	"error": "Server Error",
	"code": 500
}

{
  "error": "Unexpected token , in JSON at position 150",
  "code": 400
}

{
  "error": "No Records Found",
  "code": 404
}
```

## Insert Advance Data

| attribute   | value           |
| ----------- | ----------------|
| HTTP Method | POST            |
| Endpoint    | /advance/insert |

### Parameters  

| parameter   | datatype        | example     |
| ---------   | --------------- | ------------|
| technicianId| BIGINT          | 9000000009  |
| semesterId  | BIGINT          | 9990000001  |
| facultyId   | BIGINT          | 9900000007  |
| dayOfWeek   | INT             | 1           |
| startTime   | TIME            | "09:00"     |
| endTime     | TIME            | "11:00"     |

### Response Body

```json
{
    "result": "success"
}
```

### Error

```json
{
  "error": STRING,
  "code": ERROR CODE (NUMBER)
}
```

### Insert Response
```http
POST http://localhost:3000/advance/insert HTTP/1.1
```

### Insert Response

```json
{
  "result": "success"
}
```

### Insert Error

```json
{
  "error": "duplicate key value violates unique constraint \"technician_technicianid_key\"",
  "code": 500
}

{
  "error": "Unexpected token , in JSON at position 150",
  "code": 400
}

{
  "error": "invalid input syntax for type time: \"a\"",
  "code": 500
}

{
  "error": "invalid input syntax for type time: \"2\"",
  "code": 500
}

{
  "error": "null value in column \"dayofweek\" violates not-null constraint",
  "code": 500
}
```

## Get Basic Result

| attribute   | value         |
| ----------- | -----------   |
| HTTP Method | GET           |
| Endpoint    | /basic/result |

### Parameters  

| parameter   | datatype        | example     |
| ---------   | --------------- | ------------|
| facultyId   | BIGINT          | 4110000001  |
| semesterId  | BIGINT          | 2020100001  |
| dayOfWeek   | INT             | 1           |

### Response Body

```json
{
    "result": [
        [
            {
                "lectureId": IDENTIFIER,
                "startTime": TIME,
                "endTime": TIME
            }
        ]
    ]
}


```

### Error

```json
{
  "error": STRING,
  "code": ERROR CODE (NUMBER)
}
```

### Sample Request

```http
GET http://localhost:3000/basic/result?facultyId=1100000000&semesterId=1110000000&dayOfWeek=3 
```

### Sample Response

```json

{
  "result": [
    [
      {
        "lectureId": 1000000008,
        "startTime": "0900",
        "endTime": "1400"
      }
    ],
    [
      {
        "lectureId": 1000000006,
        "startTime": "1000",
        "endTime": "1100"
      },
      {
        "lectureId": 1000000007,
        "startTime": "1200",
        "endTime": "1300"
      }
    ],
    [
      {
        "lectureId": 1000000009,
        "startTime": "1030",
        "endTime": "1230"
      }
    ]
  ]
}
```

### Sample Error

```json
{
  "error": "Expected Error due to Missing Field or Invalid Data",
  "code": 422
}

{
	"error": "Server Error",
	"code": 500
}

{
  "error": "Unexpected token , in JSON at position 150",
  "code": 400
}
```

## Get Advance Result

| attribute   |     value       |
| ----------- | ----------------|
| HTTP Method | GET             |
| Endpoint    | /advance/result |

### Parameters  

| parameter   | datatype        | example     |
| ---------   | --------------- | ------------|
| facultyId   | BIGINT          | 1100000000  |
| semesterId  | BIGINT          | 1110000000  |
| dayOfWeek   | INT             | 1           |

### Response Body

```json
{
    "result": [
        {
            "surplus": NUMBER,
            "startTime": TIME,
            "endTime": TIME
        }
    ]
}

```

### Error

```json
{
  "error": STRING,
  "code": ERROR CODE (NUMBER)
}
```

### Sample Request

```http
GET http://localhost:3000/advance/result?semesterId=1110000000&facultyId=1100000000&dayOfWeek=1 
```

### Sample Response

```json
{
  "result": [
    {
      "surplus": -1,
      "startTime": "1000",
      "endTime": "1030"
    },
    {
      "surplus": -2,
      "startTime": "1030",
      "endTime": "1100"
    },
    {
      "surplus": -1,
      "startTime": "1100",
      "endTime": "1130"
    }
  ]
}
```

### Sample Error

```json
{
  "error": "Expected Error due to Missing Field",
  "code": 422
}

{
	"error": "Server Error",
	"code": 500
}

{
  "error": "syntax error at or near \"facultyId\"",
  "code": 500
}
```

