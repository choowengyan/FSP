# Schema

This document will gives user a good idea of how your database's structure looks like.

You may refer to the following link to learn more about postgresql schema:

1. [CREATE statements](https://www.postgresqltutorial.com/postgresql-create-table/)
2. [Foreign Keys](https://www.postgresqltutorial.com/postgresql-foreign-key/)

The following are examples of how you can create a table, replace the examples with your own create statements of all your table.
```sql
CREATE TABLE lecture(
   ID SERIAL PRIMARY KEY,
   semesterID BIGINT UNIQUE NOT NULL,
   lectureID BIGINT UNIQUE NOT NULL,
   facultyID BIGINT UNIQUE NOT NULL,
   dayofWeek INT NOT NULL,
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

```
