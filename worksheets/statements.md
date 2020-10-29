# SQL Statements

For this worksheet you will need to provide an example of your own SQL statement. The two given are examples.

## INSERT

Example:
```sql
INSERT INTO lecture (semesterID, lectureID, facultyID, dayofWeek, startTime, endTime) VALUES (2020100001,1110000037,4110000001,2,"09:00","12:00");
```

```sql
INSERT INTO technician (technicianId, semesterId, facultyId, dayOfWeek, startTime, endTime) VALUES (1230000001, 2020100001, 4110000001, 1, "08:00", "13:00" );
```

## SELECT with Filtering and Pagination

Example:

>Basic Data 
```sql
SELECT lecture.lectureId, lecture.semesterId, lecture.facultyId, lecture.dayOfWeek, lecture.startTime, lecture.endTime FROM lecture WHERE lecture.semesterId == 2020100001 AND lecture.facultyId == 4110000001 LIMIT 1 OFFSET 2;
```

> Advance Data 
```sql
SELECT technician.technicianId, technician.semesterId, technician.facultyId, technician.dayOfWeek, technician.startTime, technician.endTime FROM technician technician.semesterId == 2020100001 AND technician.facultyId == 4110000001 AND dayOfWeek == 1 LIMIT 1 OFFSET 2;
```

## SELECT 

> Basic Result 
```sql
SELECT lecture.lectureId, lecture.startTime, lecture.endTime FROM lecture WHERE facultyId == 4110000001 AND semesterId == 2020100001 AND dayOfWeek == 1 ; 
```
> Advance Result 
```sql
SELECT technicianId, startTime, endTime FROM technician WHERE facultyId == 4110000001 AND semesterId == 2020100001 AND dayOfWeek == 1 ; SELECT lectureId, startTime, endTime FROM lecture facultyId == 4110000001 AND semesterId == 2020100001 AND dayOfWeek == 1;
```

## CREATE TABLE 

```sql
 CREATE TABLE lecture (
            ID SERIAL PRIMARY KEY,
            semesterId BIGINT NOT NULL,
            lectureId BIGINT UNIQUE NOT NULL, 
            facultyId BIGINT NOT NULL,
            dayOfWeek INT NOT NULL,
            startTime TIME NOT NULL,
            endTime TIME NOT NULL
        );
```

```sql
CREATE TABLE technician (
            ID SERIAL PRIMARY KEY,
            technicianId BIGINT UNIQUE NOT NULL,
            semesterId BIGINT NOT NULL, 
            facultyId BIGINT NOT NULL,
            dayOfWeek INT NOT NULL,
            startTime TIME NOT NULL,
            endTime TIME NOT NULL
        );
```

