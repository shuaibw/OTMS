CREATE TABLE MATERIALS
(
    MATERIAL_ID    VARCHAR(36) DEFAULT RAWTOHEX(SYS_GUID()) PRIMARY KEY,
		INSTRUCTOR_ID VARCHAR(36) NOT NULL,
		SUBJECT_ID INTEGER NOT NULL,
    TITLE VARCHAR(100) NOT NULL,
    LINK  VARCHAR(100) NOT NULL
);
ALTER TABLE MATERIALS ADD FOREIGN KEY (INSTRUCTOR_ID) REFERENCES INSTRUCTORS(ID);
ALTER TABLE MATERIALS ADD FOREIGN KEY (SUBJECT_ID) REFERENCES SUBJECTS(ID);