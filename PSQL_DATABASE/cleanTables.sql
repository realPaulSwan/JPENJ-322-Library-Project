--Simple script to clear all the tables when needed

DROP TABLE holds;
DROP TABLE checkouts;
DROP TABLE students;
DROP TABLE librarians;
DROP TABLE users;
DROP TABLE books;

\i psql_JPENJ_tables.sql
\i psql_JPENJ_data.sql