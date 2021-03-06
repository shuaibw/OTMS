CREATE TABLE BOOKS(
	BOOKING_ID VARCHAR(36),
	STUDENT_ID VARCHAR(36),
	INSTRUCTOR_ID VARCHAR(36)
);
ALTER TABLE BOOKS ADD FOREIGN KEY (BOOKING_ID) REFERENCES BOOKING(ID);
ALTER TABLE BOOKS ADD FOREIGN KEY (INSTRUCTOR_ID) REFERENCES INSTRUCTORS(ID);
ALTER TABLE BOOKS ADD FOREIGN KEY (STUDENT_ID) REFERENCES STUDENTS(ID);