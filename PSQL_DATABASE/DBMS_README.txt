-----------------------------------------------------------------------------
This folder contains all the content for our database system for our project:
-----------------------------------------------------------------------------

Inside this folder, there are currently 5 files:

    -DBMS_README.txt: This file describes the contents of each of the files, how to set up the database on
        a system, and the technologies used to create the database.

    -psql_JPENJ_tables.sql: This file contains all of the statements to create the data tables for the
        database. It also contains the statements that create the triggers that will automatically update
        necessary components of the database upon data being inserted to the database.

    -psql_JPENJ_data.sql: This file contains all the initial raw data for the database. In order to test
        the database properly and ensure a working product, I created a set of raw data to populate the
        database initially. This set of data currently contains 20 books, 6 students, and 2 librarians.

    -psql_JPENJ_tests.sql: This file contains various tests and queries to confirm that the database is
        working properly. 

    -cleanTables.sql: A simple script that will delete all the tables, then recreate them and reinsert
        all data. Solely for testing and bugfixing purposes.

-----------------------------------------------------------------------------
                            TECHNOLOGIES:
-----------------------------------------------------------------------------

    -We are using PostgreSQL for our DBMS. We plan on connecting it to Node.js for it to work with Angular
        front-end.

-----------------------------------------------------------------------------
                        SETTING UP THE DATABASE:
-----------------------------------------------------------------------------

To set up the database, first create a new psql database. Then, once you are in that database, navigate
    to this folder and run:

    \i psql_JPENJ_tables.sql

This will create all the tables in the database. Then, run:

    \i psql_JPENJ_data.sql

To insert all the raw data. If you would also like to run the test code, also run

    \i psql_JPENJ_tests.sql
