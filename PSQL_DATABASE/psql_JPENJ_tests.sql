----------------------------
--Aquire current tables, to see if the initial database was set up
----------------------------

SELECT * FROM books;
SELECT * FROM users;
SELECT * FROM students;
SELECT * FROM librarians;   --These 4 tables are the only tables with data

----------------------------
--Insert 6 holds. A student will try to put 4 books on hold, and
--  one hold should fail, showing that constraint worked properly.
--  A second student should also put 2 book on hold to confirm the
--  triggers are working properly. This second student will also 
--  try to put a hold onto a book which already has a hold on it,
--  which should fail.
----------------------------

INSERT INTO holds
VALUES ('000000001','111111110','2024/2/14');
INSERT INTO holds
VALUES ('000000001','111111111','2024/2/14');
INSERT INTO holds
VALUES ('000000001','111111112','2024/2/14');   --Student 1 puts 3 books on hold
INSERT INTO holds
VALUES ('000000001','111111113','2024/2/14');   --Student 1 puts an extra book on hold, should fail
INSERT INTO holds
VALUES ('000000002','111111114','2024/2/14');   --Student 2 puts a book on hold
INSERT INTO holds
VALUES ('000000002','111111111','2024/2/14');   --Student 2 attempts to put an already held book on hold, should fail

SELECT * FROM holds;
SELECT * FROM students;
SELECT * FROM books;

----------------------------
--Insert 8 checkouts. The first 4 checkouts will be valid and on student 1.
--  The next checkout will be on a book held by student 2, and should fail.
--  The next checkout will be on a seperate student, to show that the triggers
--  are working properly. The next checkout will be a valid checkout on student 1.
--  The final checkout will be on student 1, and should fail, to show that the
--  constraint is working properly.
----------------------------

INSERT INTO checkouts
VALUES ('000000001','111111115','2024/2/14');
INSERT INTO checkouts
VALUES ('000000001','111111116','2024/2/14');
INSERT INTO checkouts
VALUES ('000000001','111111117','2024/2/14');
INSERT INTO checkouts
VALUES ('000000001','111111118','2024/2/14');   --Student 1 checks out 4 books
INSERT INTO checkouts
VALUES ('000000001','111111114','2024/2/14');   --Student 1 checks out a held book. Should fail (unless student 1 is currently holding the book)
INSERT INTO checkouts
VALUES ('000000003','111111119','2024/2/14');   --Student 3 checks out a book.
INSERT INTO checkouts
VALUES ('000000001','111111112','2024/2/14');   --Student 1 checks out a book they are holding, which should succeed
INSERT INTO checkouts
VALUES ('000000001','111111121','2024/2/14');   --Student 1 tries to check out a 6th book, which should fail

SELECT * FROM checkouts;
SELECT * FROM holds;
SELECT * FROM students;
SELECT * FROM books;

----------------------------
--Attempt to update the librarian's username. First to something random, then
--  to another taken username, then to normal
----------------------------

UPDATE librarians
SET username = 'hughurghiuew'
WhERE username = 'Alex.James@wsu.edu'; 

SELECT * FROM librarians;

UPDATE librarians
SET username = 'Gilroy.Garlic@wsu.edu'
WhERE username = 'hughurghiuew';

SELECT * FROM librarians;

UPDATE librarians
SET username = 'Alex.James@wsu.edu'
WhERE username = 'hughurghiuew';

SELECT * FROM librarians;

----------------------------
--Delete all checkout data, and make sure it's deleted properly.
--  Then delete all held data for Student 1, and finally delete all
--  holds data.
----------------------------

DELETE FROM checkouts;

SELECT * FROM students;
SELECT * FROM books;

----------------------------

DELETE FROM holds
WHERE holder_id = '000000001';

SELECT * FROM students;
SELECT * FROM books;

----------------------------

DELETE FROM holds;

SELECT * FROM students;
SELECT * FROM books;

--Testing is now completed, with all aspects successfully tested. After all the data is deleted, the data should return to where it's initialized.