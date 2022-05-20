# JPENJ 322 Library Project
Our group project for CPTS 322.
In this project, we develop a library assistance webapp that manages user registrations, book searches, holds, checkouts, book returns, etc, as well as storing all that information on a database. 

# Technologies:

We are using Angular, Node.js, and PostgreSQL for this application. Angular serves as our front-end, Node.js is our server and API, and PostgreSQL is our database.

We are using:

- Angular version 13.3.2
- Node.js version 16.14.2
- PostgreSQL version 12.9 (Ubuntu) or 14.2 (Windows)
- Express
- Cors
- postgresql.js
- HTTPClient (angular/common/http)

# Process:

The user will interact with the front-end Angular UI. When they press a button or interact with the webap, the webapp will then parse the request and create an HTTP injectible as a way of sending the data to the API. This injectible is verified by CORS. CORS then sends the data to the Node.js server, where the data is converted into an SQL query. 

This query is then sent to the database server, which reads the query and returns the relevant data. The data is sent back to the Node.js server and sent to the Angular front-end as another HTTP injectible. This injectible is parsed by the front-end and then displayed to the user.
