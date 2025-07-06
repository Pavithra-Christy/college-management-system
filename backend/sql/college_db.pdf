#creating database
create database college_management_system;

show databases;

use college_management_system;

-- ### *1. Database Schema Creation*  
-- - Create tables with appropriate constraints (Primary Key, Foreign Key, Unique, Not Null, Check, etc.).  
-- - Tables:  
--  1 - *Students(StudentID, Name, DOB, Gender, Email, Phone, Address, DepartmentID)*  
--  2 - *Departments(DepartmentID, DepartmentName, HOD)*  
--  3 - *Courses(CourseID, CourseName, DepartmentID, Credits)*  
--  4 - *Faculty(FacultyID, Name, Email, Phone, DepartmentID, Salary)*  
--  5 - *Enrollment(EnrollmentID, StudentID, CourseID, Semester, Year, Grade)*  
--  6 - *Exams(ExamID, CourseID, ExamDate, TotalMarks, PassingMarks)*  
--  7 - *Results(ResultID, StudentID, ExamID, ObtainedMarks, Grade)*  
--  
#creating tables
#table 1
create table Students(
StudentID int primary key , 
Name varchar(100) not null, 
DOB date not null, 
Gender varchar(20) check (Gender in ('Male', 'Female', 'Other')) not null, 
Email varchar(50) unique not null, 
Phone varchar(15) unique not null, 
Address text, 
DepartmentID int not null,
foreign key(DepartmentID) references Departments(DepartmentID) -- on delete cascade
);

select * from Students;

#table 2
create table Departments(
DepartmentID int primary key, 
DepartmentName varchar(50) unique not null, 
HOD varchar(100) not null
); 

select * from Departments;

#table 3
create table Courses(
CourseID int primary key, 
CourseName varchar(100) unique not null, 
DepartmentID int not null, 
Credits int check (Credits between 1 and 10) not null,
foreign key (DepartmentID) references Departments(DepartmentID) -- on delete cascade
);

select * from Courses;

#table 4
create table Faculty(
FacultyID int primary key, 
Name varchar(100) not null, 
Email varchar(50) unique not null, 
Phone varchar(15) unique not null, 
DepartmentID int not null, 
Salary decimal(10,2) check (salary >= 20000) not null,
foreign key (DepartmentID) references Departments(DepartmentID)
);

select * from Faculty;

#table 5
create table Enrollment(
EnrollmentID int primary key, 
StudentID int not null, 
CourseID int not null, 
Semester int check (Semester between 1 and 8) not null, 
Year int not null, 
Grade char(2) check (grade in ('A','B','C','D','E','F','P','NP')) ,
foreign key (StudentID) references Students(StudentID),
foreign key (CourseID) references Courses(CourseID)
);

select * from Enrollment;

#table 6
create table Exams(
ExamID int primary key, 
CourseID int not null, 
ExamDate date not null, 
TotalMarks int not null check (TotalMarks > 0) , 
PassingMarks int not null ,
foreign key (CourseID) references Courses(CourseID),
check (PassingMarks >= 0 and PassingMarks <= TotalMarks) -- Moved to table level
);

select * from Exams;

#table 7
create table Results(
ResultID int primary key, 
StudentID int not null, 
ExamID int not null, 
ObtainedMarks int check (ObtainedMarks >= 0) not null, 
Grade char(2) check (grade in ('A','B','C','D','E','F','P','NP')),
foreign key (StudentID) references Students(StudentID),
foreign key (ExamID) references Exams(ExamID)
);

select * from Results;

#table 8
CREATE TABLE FacultyCourses (
  FacultyCourseID SERIAL PRIMARY KEY,
  FacultyID INT REFERENCES Faculty(FacultyID),
  CourseID INT REFERENCES Courses(CourseID)
);


-- - Insert at least *20 records* for Students.  
-- - Insert at least *10 records* for Faculty.  
-- - Insert multiple Courses for each Department.  
-- - Insert Exam details and corresponding Results.  

#values for Departments (table 2)
insert into Departments (DepartmentID, DepartmentName, HOD) 
values (1, 'Computer Science', 'Dr. John Smith'),
(2, 'Mechanical Engineering', 'Dr. Emily Davis'),
(3, 'Electrical Engineering', 'Dr. Mark Wilson'),
(4, 'Civil Engineering', 'Dr. Sarah Johnson'),
(5, 'Biotechnology', 'Dr. Michael Brown');


INSERT INTO Departments (DepartmentID, DepartmentName, HOD) VALUES
(6, 'History', 'Dr. Anna White'),
(7, 'Economics', 'Dr. Robert Green'),
(8, 'Political Science', 'Dr. Nancy Hall'),
(9, 'Psychology', 'Dr. David Lee'),
(10, 'English Literature', 'Dr. Laura Scott'),
(11, 'Artificial Intelligence', 'Dr. James Adams'),
(12, 'Data Science', 'Dr. Lisa Martinez'),
(13, 'Machine Learning', 'Dr. Kevin Robinson'),
(14, 'Cybersecurity', 'Dr. William Thomas'),
(15, 'Software Engineering', 'Dr. Susan Harris'),
(16, 'Networking', 'Dr. Daniel King'),
(17, 'Cloud Computing', 'Dr. Barbara Anderson'),
(18, 'Game Development', 'Dr. Christopher Moore');

select * from Departments;

#values for Students (table 1) 
INSERT INTO Students (StudentID, Name, DOB, Gender, Email, Phone, Address, DepartmentID) VALUES
(101, 'Alice Johnson', '2001-05-15', 'Female', 'alice.johnson@example.com', '9876543210', 'New York, NY', 1),
(102, 'Bob Smith', '2000-08-22', 'Male', 'bob.smith@example.com', '9876543211', 'Los Angeles, CA', 1),
(103, 'Charlie Brown', '2002-12-05', 'Male', 'charlie.brown@example.com', '9876543212', 'Chicago, IL', 2),
(104, 'David Williams', '2001-09-10', 'Male', 'david.williams@example.com', '9876543213', 'Houston, TX', 2),
(105, 'Emma Wilson', '2000-07-25', 'Female', 'emma.wilson@example.com', '9876543214', 'Phoenix, AZ', 3),
(106, 'Fiona Taylor', '2001-03-18', 'Female', 'fiona.taylor@example.com', '9876543215', 'Philadelphia, PA', 3),
(107, 'George White', '2002-11-11', 'Male', 'george.white@example.com', '9876543216', 'San Antonio, TX', 4),
(108, 'Hannah Lee', '2001-06-30', 'Female', 'hannah.lee@example.com', '9876543217', 'San Diego, CA', 4),
(109, 'Ian Martinez', '2000-02-28', 'Male', 'ian.martinez@example.com', '9876543218', 'Dallas, TX', 5),
(110, 'Julia Adams', '2001-04-09', 'Female', 'julia.adams@example.com', '9876543219', 'San Jose, CA', 5),
(111, 'Kevin Thomas', '2002-01-16', 'Male', 'kevin.thomas@example.com', '9876543220', 'Austin, TX', 1),
(112, 'Laura Scott', '2000-09-23', 'Female', 'laura.scott@example.com', '9876543221', 'Jacksonville, FL', 1),
(113, 'Michael Rodriguez', '2001-08-07', 'Male', 'michael.rodriguez@example.com', '9876543222', 'Columbus, OH', 2),
(114, 'Nancy Perez', '2000-05-14', 'Female', 'nancy.perez@example.com', '9876543223', 'Charlotte, NC', 2),
(115, 'Oscar Hall', '2002-07-20', 'Male', 'oscar.hall@example.com', '9876543224', 'Indianapolis, IN', 3),
(116, 'Paula Rivera', '2001-12-29', 'Female', 'paula.rivera@example.com', '9876543225', 'San Francisco, CA', 3),
(117, 'Quentin Carter', '2000-11-03', 'Male', 'quentin.carter@example.com', '9876543226', 'Seattle, WA', 4),
(118, 'Rachel Flores', '2001-10-17', 'Female', 'rachel.flores@example.com', '9876543227', 'Denver, CO', 4),
(119, 'Samuel Edwards', '2002-06-12', 'Male', 'samuel.edwards@example.com', '9876543228', 'Washington, DC', 5),
(120, 'Tina Gomez', '2000-03-27', 'Female', 'tina.gomez@example.com', '9876543229', 'Boston, MA', 5);

select * from Students;

#values for Faculty (table 4)
INSERT INTO Faculty (FacultyID, Name, Email, Phone, DepartmentID, Salary) VALUES
(201, 'Dr. Richard Stone', 'richard.stone@example.com', '9876543301', 1, 80000),
(202, 'Dr. Sarah Connor', 'sarah.connor@example.com', '9876543302', 1, 75000),
(203, 'Dr. Jason Carter', 'jason.carter@example.com', '9876543303', 2, 78000),
(204, 'Dr. Linda Miller', 'linda.miller@example.com', '9876543304', 2, 72000),
(205, 'Dr. Henry Wilson', 'henry.wilson@example.com', '9876543305', 3, 79000),
(206, 'Dr. Olivia Martin', 'olivia.martin@example.com', '9876543306', 3, 74000),
(207, 'Dr. Thomas Anderson', 'thomas.anderson@example.com', '9876543307', 4, 76000),
(208, 'Dr. Emily White', 'emily.white@example.com', '9876543308', 4, 73000),
(209, 'Dr. William Scott', 'william.scott@example.com', '9876543309', 5, 77000),
(210, 'Dr. Jessica Lopez', 'jessica.lopez@example.com', '9876543310', 5, 71000);

select * from Faculty;

#values for Courses (table 3)
INSERT INTO Courses (CourseID, CourseName, DepartmentID, Credits) VALUES
(301, 'Data Structures', 1, 4),
(302, 'Algorithms', 1, 4),
(303, 'Machine Learning', 1, 3),
(304, 'Thermodynamics', 2, 4),
(305, 'Fluid Mechanics', 2, 4),
(306, 'Electrical Circuits', 3, 3),
(307, 'Power Systems', 3, 3),
(308, 'Structural Engineering', 4, 4),
(309, 'Environmental Science', 4, 3),
(310, 'Genetics and Biotechnology', 5, 3);

INSERT INTO Courses (CourseID, CourseName, DepartmentID, Credits) VALUES
(201, 'Mathematics 101', 1, 3),
(202, 'Physics 101', 4, 4),  -- Changed DepartmentID from 2 to 4 (Civil Engineering)
(203, 'Chemistry 101', 5, 3), -- Changed DepartmentID from 3 to 5 (Biotechnology)
(204, 'Biology 101', 5, 4),
(205, 'Computer Science 101', 1, 3),
(206, 'History 101', 6, 3),
(207, 'Economics 101', 7, 3),
(208, 'Political Science 101', 8, 3),
(209, 'Psychology 101', 9, 4),
(210, 'English Literature 101', 10, 3),
(211, 'Engineering Mechanics 101', 4, 4), -- Changed DepartmentID from 11 to 4 (Civil Engineering)
(212, 'Electronics 101', 1, 3),  -- Changed DepartmentID from 12 to 1 (Computer Science)
(213, 'Artificial Intelligence 101', 11, 4), -- Changed DepartmentID from 13 to 11 (AI)
(214, 'Data Science 101', 12, 4), -- Changed DepartmentID from 14 to 12 (Data Science)
(215, 'Machine Learning 101', 13, 3), -- Changed DepartmentID from 15 to 13 (ML)
(216, 'Cybersecurity 101', 14, 3), -- Changed DepartmentID from 16 to 14 (Cybersecurity)
(217, 'Software Engineering 101', 15, 3), -- Changed DepartmentID from 17 to 15 (Software Engg)
(218, 'Networking 101', 16, 3), -- Changed DepartmentID from 18 to 16 (Networking)
(219, 'Cloud Computing 101', 17, 4), -- Changed DepartmentID from 19 to 17 (Cloud Computing)
(220, 'Game Development 101', 18, 4); -- Changed DepartmentID from 20 to 18 (Game Dev)

select * from Courses;

#values for Exams (table 6)
INSERT INTO Exams (ExamID, CourseID, ExamDate, TotalMarks, PassingMarks) VALUES
(401, 301, '2025-06-10', 100, 40),
(402, 302, '2025-06-15', 100, 40),
(403, 303, '2025-06-20', 100, 50),
(404, 304, '2025-06-25', 100, 45),
(405, 305, '2025-07-01', 100, 50);

select * from Exams;

#values for Results (table 7)
INSERT INTO Results (ResultID, StudentID, ExamID, ObtainedMarks, Grade) VALUES
(501, 101, 401, 85, 'A'),
(502, 102, 401, 78, 'B'),
(503, 103, 402, 66, 'C'),
(504, 104, 403, 90, 'A'),
(505, 105, 404, 40, 'D'),
(506, 106, 405, 95, 'A'),
(507, 107, 405, 55, 'C'),
(508, 108, 403, 80, 'B'),
(509, 109, 402, 70, 'B'),
(510, 110, 401, 88, 'A');

select * from Results;

#values for Enrollment (table 5)
INSERT INTO Enrollment (EnrollmentID, StudentID, CourseID, Semester, Year, Grade) VALUES
(1, 101, 201, 1, 2023, 'A'),
(2, 102, 202, 1, 2023, 'B'),
(3, 103, 203, 2, 2023, 'A'),
(4, 104, 204, 2, 2023, 'C'),
(5, 105, 205, 3, 2023, 'B'),
(6, 106, 206, 3, 2023, 'D'),
(7, 107, 207, 4, 2023, 'A'),
(8, 108, 208, 4, 2023, 'B'),
(9, 109, 209, 5, 2023, 'C'),
(10, 110, 210, 5, 2024, 'A'),
(11, 111, 211, 6, 2024, 'B'),
(12, 112, 212, 6, 2024, 'D'),
(13, 113, 213, 7, 2024, 'E'),
(14, 114, 214, 7, 2024, 'F'),
(15, 115, 215, 8, 2024, 'B'), -- Changed 'P' to 'B' (if 'P' is invalid)
(16, 116, 216, 8, 2024, 'C'), -- Changed 'NP' to 'C' (if 'NP' is invalid)
(17, 117, 217, 1, 2023, 'A'),
(18, 118, 218, 2, 2023, 'B'),
(19, 119, 219, 3, 2023, 'C'),
(20, 120, 220, 4, 2023, 'A');

select * from Enrollment;

INSERT INTO Enrollment (EnrollmentID, StudentID, CourseID, Semester, Year, Grade) VALUES
(1, 101, 301, 1, 2024, 'A'),
(2, 102, 302, 1, 2024, 'B'),
(3, 103, 304, 1, 2024, 'C'),
(4, 104, 305, 1, 2024, 'A'),
(5, 105, 306, 1, 2024, 'B'),
(6, 106, 301, 1, 2024, 'A'),
(7, 107, 302, 1, 2024, 'C'),
(8, 108, 304, 1, 2024, 'B'),
(9, 109, 305, 1, 2024, 'D'),
(10, 110, 306, 1, 2024, 'F');





-- Assign Sarah Connor (202) to Algorithms (CourseID: 302)
INSERT INTO facultycourses (FacultyID, CourseID) VALUES (202, 302);

-- Assign Jason Carter (203) to Thermodynamics (CourseID: 304)
INSERT INTO facultycourses (FacultyID, CourseID) VALUES (203, 304);

-- Assign Linda Miller (204) to Fluid Mechanics (CourseID: 305)
INSERT INTO facultycourses (FacultyID, CourseID) VALUES (204, 305);

-- Assign Olivia Martin (206) to Electrical Circuits (CourseID: 306)
INSERT INTO facultycourses (FacultyID, CourseID) VALUES (206, 306);

-- Assign Richard Stone (201) to Data Structures (CourseID: 301)
INSERT INTO facultycourses (FacultyID, CourseID) VALUES (201, 301);

--
SELECT * FROM Courses WHERE CourseID BETWEEN 201 AND 220;
--
-- ALTER TABLE Students MODIFY StudentID INT AUTO_INCREMENT;
-- ALTER TABLE Faculty MODIFY FacultyID INT AUTO_INCREMENT;
-- ALTER TABLE Courses MODIFY CourseID INT AUTO_INCREMENT;
-- ALTER TABLE Departments MODIFY DepartmentID INT AUTO_INCREMENT;
-- ALTER TABLE Exams MODIFY ExamID INT AUTO_INCREMENT;
-- ALTER TABLE Results MODIFY ResultID INT AUTO_INCREMENT;
--
select * from students;
select * from faculty;
select * from Results;
select * from Enrollment;
select * from Exams;
select * from Courses;
select * from departments;


-- use college_management_system;

-- show tables;

-- select * from authentication_user;

-- select * from students;

-- select * from departments;

-- select * from courses;

-- select * from enrollment;

-- ALTER TABLE courses DROP FOREIGN KEY courses_ibfk_1;

-- ALTER TABLE faculty
-- ADD CONSTRAINT faculty_ibfk_1 FOREIGN KEY (DepartmentID) REFERENCES departments(DepartmentID);

-- SHOW CREATE TABLE faculty;

-- ALTER TABLE faculty DROP FOREIGN KEY faculty_ibfk_1;

-- ALTER TABLE students 
-- MODIFY COLUMN StudentID INT NOT NULL AUTO_INCREMENT;

-- SHOW CREATE TABLE students;

-- ALTER TABLE enrollment DROP FOREIGN KEY enrollment_ibfk_1;

-- ALTER TABLE students 
-- MODIFY COLUMN StudentID INT NOT NULL AUTO_INCREMENT;


-- ALTER TABLE enrollment DROP FOREIGN KEY enrollment_ibfk_1;
-- ALTER TABLE results DROP FOREIGN KEY results_ibfk_1;

-- ALTER TABLE students 
-- MODIFY COLUMN StudentID INT NOT NULL AUTO_INCREMENT;


-- ALTER TABLE enrollment 
-- ADD CONSTRAINT enrollment_ibfk_1 
-- FOREIGN KEY (StudentID) REFERENCES students(StudentID);

-- ALTER TABLE results 
-- ADD CONSTRAINT results_ibfk_1 
-- FOREIGN KEY (StudentID) REFERENCES students(StudentID);


-- SHOW CREATE TABLE courses;

-- select * from courses;
-- ALTER TABLE courses MODIFY CourseID INT NOT NULL AUTO_INCREMENT;


-- -- 1. Drop all foreign keys referencing CourseID
-- ALTER TABLE enrollment DROP FOREIGN KEY enrollment_ibfk_2;
-- ALTER TABLE exams DROP FOREIGN KEY exams_ibfk_1;

-- -- 2. Modify the CourseID column to AUTO_INCREMENT
-- ALTER TABLE courses MODIFY CourseID INT NOT NULL AUTO_INCREMENT;

-- -- 3. Recreate the foreign keys
-- ALTER TABLE enrollment
-- ADD CONSTRAINT enrollment_ibfk_2 FOREIGN KEY (CourseID) REFERENCES courses(CourseID);

-- ALTER TABLE exams
-- ADD CONSTRAINT exams_ibfk_1 FOREIGN KEY (CourseID) REFERENCES courses(CourseID);


-- ALTER TABLE faculty MODIFY FacultyID INT NOT NULL AUTO_INCREMENT;


-- ALTER TABLE departments 
-- MODIFY COLUMN DepartmentID INT NOT NULL AUTO_INCREMENT;


-- ALTER TABLE students DROP FOREIGN KEY students_ibfk_1;
-- ALTER TABLE courses DROP FOREIGN KEY courses_ibfk_1;
-- ALTER TABLE faculty DROP FOREIGN KEY faculty_ibfk_1;
-- ALTER TABLE courses DROP FOREIGN KEY courses_ibfk_1;

-- ALTER TABLE departments 
-- MODIFY COLUMN DepartmentID INT NOT NULL AUTO_INCREMENT;
-- ALTER TABLE students 
-- ADD CONSTRAINT students_ibfk_1 FOREIGN KEY (department_id) 
-- REFERENCES departments(DepartmentID) ON DELETE SET NULL;


-- -- Students table foreign key constraint
-- ALTER TABLE students 
-- ADD CONSTRAINT students_ibfk_1 
-- FOREIGN KEY (DepartmentID) 
-- REFERENCES departments(DepartmentID) ;

-- -- Courses table foreign key constraint
-- ALTER TABLE courses 
-- ADD CONSTRAINT courses_ibfk_1 
-- FOREIGN KEY (DepartmentID) 
-- REFERENCES departments(DepartmentID) ;

-- -- Faculty table foreign key constraint
-- ALTER TABLE faculty 
-- ADD CONSTRAINT faculty_ibfk_1 
-- FOREIGN KEY (DepartmentID) 
-- REFERENCES departments(DepartmentID) ;


-- ALTER TABLE Exams MODIFY ExamID INT NOT NULL AUTO_INCREMENT;
-- ALTER TABLE courses DROP FOREIGN KEY courses_ibfk_1;

-- ALTER TABLE faculty 
-- ADD CONSTRAINT faculty_ibfk_1 
-- FOREIGN KEY (DepartmentID) 
-- REFERENCES departments(DepartmentID) ;



-- ALTER TABLE results DROP FOREIGN KEY results_ibfk_2;

-- ALTER TABLE exams MODIFY ExamID INT NOT NULL AUTO_INCREMENT;

-- ALTER TABLE results
-- ADD CONSTRAINT results_ibfk_2
-- FOREIGN KEY (ExamID) REFERENCES exams(ExamID);


-- ALTER TABLE results MODIFY COLUMN ResultID INT AUTO_INCREMENT;


-- ALTER TABLE enrollment
-- MODIFY COLUMN EnrollmentID INT AUTO_INCREMENT;


-- SHOW CREATE TABLE token_blacklist_outstandingtoken;

-- select * from token_blacklist_outstandingtoken;


-- SELECT * FROM token_blacklist_outstandingtoken WHERE user_id NOT IN (SELECT id FROM authentication_user);


-- drop table auth_user;



-- DROP TABLE auth_user_user_permissions;
-- DROP TABLE auth_user_groups;
-- DROP TABLE token_blacklist_blacklistedtoken;
-- DROP TABLE token_blacklist_outstandingtoken;
-- DROP TABLE auth_user;

-- -- (optional)
-- DROP TABLE auth_group_permissions;
-- DROP TABLE auth_group;
-- DROP TABLE auth_permission;


-- -- Be cautious when doing this!
-- SET FOREIGN_KEY_CHECKS = 0;

-- DROP TABLE auth_user_user_permissions;
-- DROP TABLE auth_user_groups;
-- DROP TABLE token_blacklist_blacklistedtoken;
-- DROP TABLE token_blacklist_outstandingtoken;
-- DROP TABLE auth_user;

-- SET FOREIGN_KEY_CHECKS = 1;


-- DELETE FROM django_migrations WHERE app = 'token_blacklist';

-- SET SQL_SAFE_UPDATES = 1;


-- #table 8
-- CREATE TABLE FacultyCourses (
--   FacultyCourseID SERIAL PRIMARY KEY,
--   FacultyID INT REFERENCES Faculty(FacultyID),
--   CourseID INT REFERENCES Courses(CourseID)
-- );
-- CREATE TABLE FacultyCourses (
--   FacultyCourseID INT PRIMARY KEY,
--   FacultyID INT REFERENCES Faculty(FacultyID),
--   CourseID INT REFERENCES Courses(CourseID)
-- );


-- select * from facultycourses;


-- DESCRIBE facultycourses;

-- SELECT * FROM Exams WHERE CourseID = 305;
-- SELECT * FROM Results WHERE ExamID = 405;

-- select * from faculty;

-- SELECT * FROM enrollment ;

-- INSERT INTO enrollment (StudentID, CourseID, Semester, Year, Grade)
-- VALUES 
--   (101, 304, 2, 2024, 'A');
-- describe enrollment;
