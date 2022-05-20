import express from 'express';
import bodyParser  from "body-parser";
import cors from "cors";
import postgresql from 'pg';
import os from "os";

const { Pool } = postgresql;

const pool = new Pool({
    user: process.env.NODE_ENV === 'development' && (os.userInfo() || {}).username || 'postgres',
    database: 'libraryapp',
    password: 'postgres',
    host: '127.0.0.1',
    port: 5432,
});

const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.NODE_ENV === 'development' ? ['http://localhost:3000', 'http://localhost:4200','http://localhost:8000','http://localhost:5000','http://localhost:8080'] : ['https://rainyville.org']
}));


app.use(bodyParser.json());

// postgresql(async (connection) => {
//     console.log('PostgreSQL database seeded!');
// });

//Function to return set of librarians for user authentication
app.get('/library_authenticate', async (req, res) => {
    // const rows = await pool.query('SELECT username,user_password FROM librarians');
    // res.status(200).send(JSON.stringify(rows));
    pool.query(
        "SELECT username,user_password FROM librarians",
        (error, results) => {
            if (error) {
                throw error;
            }

            res.status(200).json(results.rows);
        }
    );

});

//Function for collecting all book data when searching books
app.get('/books', async (req, res) => {
    //res.set('Access-Control-Allow-Origin', 'http://localhost:8000');
    // const rows = await pool.query('SELECT title,genre,author,book_desc,book_status FROM books');
    // res.status(200).send(JSON.stringify(rows));
    pool.query(
        "SELECT title,genre,author,book_desc,book_status FROM books",
        (error, results) => {
            if (error) {
                throw error;
            }

            res.status(200).json(results.rows);
        }
    );

});

//Function for collecting all book data when searching books
app.get('/users', async (req, res) => {
    //res.set('Access-Control-Allow-Origin', 'http://localhost:8000');
    // const rows = await pool.query('SELECT first_name,last_name FROM users,students WHERE users.user_id = students.student_id;');
    // res.status(200).send(JSON.stringify(rows));
    pool.query(
        "SELECT first_name,last_name FROM users,students WHERE users.user_id = students.student_id",
        (error, results) => {
            if (error) {
                throw error;
            }

            res.status(200).json(results.rows);
        }
    );

});
app.get('/librarians', async (req, res) => {
    //res.set('Access-Control-Allow-Origin', 'http://localhost:8000');
    // const rows = await pool.query('SELECT first_name,last_name FROM users,librarians WHERE users.user_id = librarians.librarian_id;');
    // res.status(200).send(JSON.stringify(rows));
    pool.query(
        "SELECT first_name,last_name FROM users,librarians WHERE users.user_id = librarians.librarian_id",
        (error, results) => {
            if (error) {
                throw error;
            }

            res.status(200).json(results.rows);
        }
    );
});

app.post("/insert_student", (req, res) => {
    const {user_id, first_name, last_name} = req.body;

    pool.query(
        "INSERT INTO users VALUES ($1, $2, $3)",
        [user_id, first_name, last_name],
        (error, results) => {
            if (error) {
                throw error;
            }

//            res.sendStatus(201);
            
        }
    );
    setTimeout(             //Set a time out period to allow the data to insert into users
      () => {
        pool.query(
            "INSERT INTO students VALUES ($1, $2, $3)",
            [user_id, 0, 0],
            (error, results) => {
                if (error) {
                    throw error;
                }
    
                res.sendStatus(201);
            }
        );
      },
      500 // the time to sleep to delay for
  );

});


app.post("/api/insert_librarian", (req, res) => {
    const {user_id, first_name, last_name, username, user_password} = req.body;
    pool.query(
        "INSERT INTO users VALUES ($1, $2, $3)",
        [user_id, first_name, last_name],
        (error, results) => {
            if (error) {
                throw error;
            }

            //res.sendStatus(201);
        }
    );

    setTimeout(             //Set a time out period to allow the data to insert into users
    () => {
        pool.query(
            "INSERT INTO librarians VALUES ($1, $2, $3)",
            [user_id, username, user_password],
            (error, results) => {
                if (error) {
                    throw error;
                }
    
                res.sendStatus(201);
            }
        );
    },
    500 // the time to sleep to delay for
);
});

app.post("/api/insert_book", (req, res) => {
    const {book_id, title, author, genre, book_desc} = req.body;
    pool.query(
        "INSERT INTO books VALUES ($1, $2, $3, $4, $5, $6)",
        [book_id, title, genre, author, book_desc, 'available'],
        (error, results) => {
            if (error) {
                throw error;
            }

            res.sendStatus(201);
        }
    );
});

app.listen(3000, () => {
    console.log(`Server is running.`);
    console.log('debug mode: ',process.env.NODE_ENV === 'development');
    console.log('App running at http://localhost:3000/');
});
