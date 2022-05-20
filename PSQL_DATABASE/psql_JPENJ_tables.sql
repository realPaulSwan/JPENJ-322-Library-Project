----------------------------
--Book Table:
--
--The book table contains all the important book data in the database, such as
--the books' title, genre, author, and description. The book also has a unique ID that
--identifies it, as well as a status that shows if the book is held, checked out, or available.
--
--The user who has checked out/held the book is not included in this table to reduce redundancy
--(Don't want to include empty held-by data in the table), so the status is only here to make it easy
--to query for the book's availability when searching books. It automatically updates when a book's status changes.
----------------------------
CREATE TABLE books (
    book_id VARCHAR(9) PRIMARY KEY,
    title VARCHAR,
    genre VARCHAR,
    author VARCHAR,
    book_desc VARCHAR,
    book_status VARCHAR
);

----------------------------
--Users Table:
--
--The users table contains all the basic user information that is universal for all users (students or librarians).
--As such, the users table contains the user_id for the user, and the first and last name. Any other data (email, etc)
--that is universal to all users should go here.
--
--Further information unique to students or librarians are stores in their own associated tables, to reduce redundancy.
----------------------------
CREATE TABLE users (
    user_id VARCHAR(9) PRIMARY KEY,
    first_name VARCHAR,
    last_name VARCHAR
);

----------------------------
--Students Table:
--
--The students table contains all unique data for students. It contains a foreign key reference to the user_id
--(shared between users and students tables), as well as the amount of books the user has checked out and held.
--This is contained to denote the user as a student, as well as having easy reference for the amount of books the
--student has taken (To check to make sure the student hasn't taken too many). 
--
--Additionally, there are checks on the amount of books the user possesses to prevent the user from taking too many books.
----------------------------
CREATE TABLE students (
    student_id VARCHAR(9) REFERENCES users(user_id),
    current_checkedout INT CHECK(current_checkedout < 6),
    current_held INT CHECK(current_held < 4),
    PRIMARY KEY(student_id)
);

----------------------------
--Librarians Table:
--
--The librarians table contains the unique data for librarians. Like the students table, this table contains a reference
--to the user_id in users, so the data is shared. This table also contains the librarian's username/password,
--for authentication purposes.
----------------------------
CREATE TABLE librarians (
    librarian_id VARCHAR(9) REFERENCES users(user_id),
    username VARCHAR NOT NULL,
    user_password VARCHAR NOT NULL,
    UNIQUE(username),
    PRIMARY KEY(librarian_id)
);

----------------------------
--Checkouts Table:
--
--The checkouts table contains the data for books when they're checked out. It contains the book's id
--(to know what book is taken), the user id (to know who checked out the book), and the overdue date for the book.
----------------------------
CREATE TABLE checkouts (
    holder_id VARCHAR(9) REFERENCES users(user_id),
    book_id VARCHAR(9) REFERENCES books(book_id),
    overdue_date DATE,
    PRIMARY KEY(book_id)
);

----------------------------
--Holds Table:
--
--The holds table contains the data for books when they're held. It's identical to checkouts table, just for holds instead.
----------------------------
CREATE table holds (
    holder_id VARCHAR(9) REFERENCES users(user_id),
    book_id VARCHAR(9) REFERENCES books(book_id),
    hold_date DATE,
    PRIMARY KEY(book_id)
);

----------------------------
--Update Holds Trigger:
--
--This trigger will activate whenever a tuple is inserted into the holds table. When this happens, the user's held books
--also increases in students, and the book's status is changed to 'held'.
----------------------------
CREATE OR REPLACE FUNCTION updateH()
    RETURNS TRIGGER AS $$
BEGIN
    UPDATE students
    SET current_held = students.current_held + 1
    WHERE students.student_id = NEW.holder_id;
    UPDATE books
    SET book_status = 'held'
    WHERE books.book_id = NEW.book_id;
    RETURN NEW;
END
$$    LANGUAGE plpgsql;

CREATE TRIGGER updateHeld
AFTER INSERT ON holds
FOR EACH ROW
WHEN (NEW.holder_id IS NOT NULL and NEW.book_id IS NOT NULL)
EXECUTE PROCEDURE updateH();

----------------------------
--Update Checkouts Trigger:
--
--This trigger will activate whenever a tuple is inserted into the checkouts table. When this happens, the user's checked out books
--also increases in students, and the book's status is changed to 'checked out'.
----------------------------
CREATE OR REPLACE FUNCTION updateC()
    RETURNS TRIGGER AS $$
BEGIN
    UPDATE students
    SET current_checkedout = students.current_checkedout + 1
    WHERE students.student_id = NEW.holder_id;
    UPDATE books
    SET book_status = 'checked out'
    WHERE books.book_id = NEW.book_id;
    RETURN NEW;
END
$$    LANGUAGE plpgsql;

CREATE TRIGGER updateCheckout
AFTER INSERT ON checkouts
FOR EACH ROW
WHEN (NEW.holder_id IS NOT NULL and NEW.book_id IS NOT NULL)
EXECUTE PROCEDURE updateC();

----------------------------
--Update Check Books Trigger:
--
--This trigger will activate whenever a tuple is deleted from the checkouts table. When this happens, the associated user's
--checked_out value is decreased by one, and the book's status is returned to 'available'
----------------------------
CREATE OR REPLACE FUNCTION updateBC()
    RETURNS TRIGGER AS $$
BEGIN
    UPDATE students
    SET current_checkedout = students.current_checkedout - 1
    WHERE students.student_id = OLD.holder_id;
    UPDATE books
    SET book_status = 'available'
    WHERE books.book_id = OLD.book_id;
    RETURN NEW;
END
$$    LANGUAGE plpgsql;

CREATE TRIGGER updateCheckBooks
AFTER DELETE ON checkouts
FOR EACH ROW
EXECUTE PROCEDURE updateBC();

----------------------------
--Update Held Books Trigger:
--
--This trigger will activate whenever a tuple is deleted from the holds table. When this happens, the associated user's
--held value is decreased by one, and the book's status is returned to 'available'
----------------------------
CREATE OR REPLACE FUNCTION updateBH()
    RETURNS TRIGGER AS $$
BEGIN
    UPDATE students
    SET current_held = students.current_held - 1
    WHERE students.student_id = OLD.holder_id;
    UPDATE books
    SET book_status = 'available'
    WHERE books.book_id = OLD.book_id;
    RETURN NEW;
END
$$    LANGUAGE plpgsql;

CREATE TRIGGER updateHeldBooks
AFTER DELETE ON holds
FOR EACH ROW
EXECUTE PROCEDURE updateBH();

----------------------------
--Prevent Holds Trigger:
--
--This trigger will activate whenever a tuple is inserted to the holds table. If the held book is already checked out, the
--insertion is deleted.
----------------------------
CREATE OR REPLACE FUNCTION preventH()
    RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS(SELECT * FROM checkouts WHERE checkouts.book_id = NEW.book_id) THEN
        UPDATE students
        SET current_held = students.current_held + 4    --Want to reject the insertion, which this forces.
        WHERE students.student_id = NEW.holder_id;                  --Not a good way to do this but I spend way too long
        RETURN NEW;                                                 --trying to fix it so this works.
    END IF;
    RETURN NEW;
END
$$    LANGUAGE plpgsql;

CREATE TRIGGER preventHold
AFTER INSERT ON holds
FOR EACH ROW
EXECUTE PROCEDURE preventH();

----------------------------
--Prevent Checkouts Trigger:
--
--This trigger will activate whenever a tuple is inserted to the checkouts table. If the checked out book is already held by another student, the
--insertion is deleted.
----------------------------
CREATE OR REPLACE FUNCTION preventC()
    RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS(SELECT * FROM holds WHERE holds.book_id = NEW.book_id AND holds.holder_id <> NEW.holder_id) THEN
        UPDATE students
        SET current_checkedout = students.current_checkedout + 6    --Want to reject the insertion, which this forces.
        WHERE students.student_id = NEW.holder_id;                  --Not a good way to do this but I spend way too long
        RETURN NEW;                                                 --trying to fix it so this works.
    END IF;
    IF EXISTS(SELECT * FROM holds WHERE holds.book_id = NEW.book_id AND holds.holder_id = NEW.holder_id) THEN
        DELETE FROM holds
        WHERE NEW.book_id = holds.book_id;
    END IF;
    RETURN NEW;
END
$$    LANGUAGE plpgsql;

CREATE TRIGGER preventCheckout
AFTER INSERT ON checkouts
FOR EACH ROW
EXECUTE PROCEDURE preventC();

--TODO:
--
--Add indexing to the data to make it easier to search for books in the future
--
--Potentially add a trigger to automatically put a new user into students or librarians