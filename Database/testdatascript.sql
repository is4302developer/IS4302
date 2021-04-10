DROP TABLE IF EXISTS traceinfo CASCADE;

CREATE TABLE traceinfo(
	id varchar(10) NOT NULL,
	date date DEFAULT CURRENT_DATE,
	check_in time DEFAULT CURRENT_TIME(0),
	check_out time,
	shop_name varchar(100) NOT NULL,
	PRIMARY KEY(id, date, check_in)
);

/* Test values for traceinfo table */
INSERT INTO traceinfo VALUES('S1234567A', '200325', '12:30:01', '13:05:23', 'NEX BURGER KING');
INSERT INTO traceinfo VALUES('S1234567A', '200325', '21:22:15', '23:58:10', 'KINGS POOL');
INSERT INTO traceinfo VALUES('S1234567A', '200326', '10:50:30', '12:16:34', 'TOA PAYOH CENTRAL LIBRARY');
INSERT INTO traceinfo VALUES('S1234567A', '200326', '15:06:09', '18:30:48', 'NUS BUSINESS SCHOOL');
INSERT INTO traceinfo VALUES('S1234567A', '200327', '11:30:01', '12:05:17', 'NUS THE DECK CANTEEN');

/*Check In*/
INSERT INTO traceinfo(id, shop_name) VALUES ('S1234567A', 'NEX MCDONALDS');

/*Check Out*/
UPDATE traceinfo SET check_out = CURRENT_TIME(0) WHERE id = 'S1234567A' AND shop_name = 'NEX MCDONALDS';
