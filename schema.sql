-- DROP TABLE guest;
-- DROP TABLE event;
-- DROP TABLE person;

CREATE TABLE event (
	eid INTEGER PRIMARY KEY,
	name TEXT,
	purpose TEXT,
	venue TEXT,
	country INTEGER,
	start_date TIMESTAMP,
	end_date TIMESTAMP
);

CREATE TABLE person (
	pid INTEGER PRIMARY KEY,
	first_name TEXT,
	last_name TEXT,
	email TEXT,
	sfdc_id INTEGER,
	job_title TEXT,
	role_level TEXT,
	bu TEXT
);

CREATE TABLE guest (
	eid INTEGER REFERENCES event(eid),
	pid INTEGER REFERENCES person(pid),
	attended BOOLEAN,
	registered BOOLEAN,
	approved BOOLEAN
);