CREATE TABLE STUDENTS (
	ID VARCHAR(36) DEFAULT RAWTOHEX(SYS_GUID ( )) PRIMARY KEY,
	ADDR_ID VARCHAR(36),
	NAME VARCHAR ( 50 ) NOT NULL,
	DATE_CREATED DATE DEFAULT SYSDATE,
	EMAIL VARCHAR ( 30 ) NOT NULL,
	USERNAME VARCHAR ( 30 ) NOT NULL,
	PASSWORD VARCHAR ( 82 ) NOT NULL,
	PHONE VARCHAR(30) NOT NULL,
	AGE INTEGER,
	GENDER VARCHAR ( 20 ),
	SCHOOL VARCHAR ( 50 ),
	GRADE VARCHAR ( 15 ),
	FACULTY VARCHAR ( 10 ),
	VERSION VARCHAR (10),
	CLASSES_ATTENDED INTEGER DEFAULT 0,
CHECK ( CLASSES_ATTENDED >= 0 ) 
);
alter table students add foreign key (addr_id) references address(id);
alter table students add constraint std_username_unique unique (username); 