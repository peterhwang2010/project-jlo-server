DROP TABLE event;
CREATE TABLE event (
	eid SERIAL PRIMARY KEY,
	name TEXT,
	purpose TEXT,
	venue TEXT,
	country INTEGER,
	start_time TIMESTAMP,
	end_time TIMESTAMP
);

DROP TABLE person;
CREATE TABLE person (
	pid SERIAL PRIMARY KEY,
	first_name TEXT,
	last_name TEXT,
	email TEXT,
	sfdc_id INTEGER,
	job_title TEXT,
	role_level TEXT,
	bu TEXT
);

DROP TABLE attendance;
CREATE TABLE attendance (
	eid INTEGER REFERENCES event(eid),
	pid INTEGER REFERENCES person(pid),
	attended BOOLEAN,
	registered BOOLEAN,
	approved BOOLEAN
);