# IS4302 Group 15 Project (Contact Tracing)

<!-- Link to Presentation Video -->

#### Link to Presentation Video: https://drive.google.com/file/d/1JM7D1OuBW81k08_xM52qtD_H7oMPVBJQ/view?usp=sharing

<!-- ABOUT THE PROJECT -->

## About The Project

This project is a contact tracing application which makes use of blockchain technology to address the problems in the current contact tracing system.
Concerned about transparency and accountability issues regarding the current contact tracing system?
Click on the link above to hear more about our final presentation on the integration of Blockchain technology and contact tracing!

## Steps to Run the Project
Ensure that Node and Postgres are already installed.

### Frontend

`cd Frontend\frontend-react`<br />
`npm install`<br />
`npm start`

### Backend server

`cd Database\backend`<br />
`npm install`<br />
`node index.js`

### Database
`cd Database`<br />
Run the testdatascript.sql file on PostgreSQL: `\i <path>/testdatascript.sql`<br />
<path> is the path to the testdatascript.sql script<br />
`cd Database\backend`<br />
Create/fill up .env file with the connection string:
	e.g. DATABASE URL=postgres://<username>:<password>@host address:<port>/<database name>
	replace <username>, <password>, <port> and <databse name> according to your PostgreSQL configuration
