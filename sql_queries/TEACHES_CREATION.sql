create table teaches(
INSTRUCTOR_ID VARCHAR(36),
SUBJECT_ID INTEGER
);

ALTER TABLE teaches ADD FOREIGN KEY (instructor_id) REFERENCES instructors (id);
ALTER TABLE teaches ADD FOREIGN KEY (SUBJECT_ID) REFERENCES subjects (ID);