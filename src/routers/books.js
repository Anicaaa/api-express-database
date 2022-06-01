const express = require("express");
const router = express.Router();
const db = require("../../db");

// GET all fiction and non-fiction books
router.get("/", async (req, res) => {
  const type = req.query.type;
  const topic = req.query.topic;
  let sqlString = 'SELECT * FROM "books"';

  if (type && topic) {
    sqlString += ` WHERE type = '${type}' AND topic = '${topic}';`;
  } else if (type) {
    sqlString += ` WHERE type = '${type}';`;
  } else if (topic) {
    sqlString += ` WHERE topic = '${topic}';`;
  }
  console.log(sqlString);
  const result = await db.query(sqlString);
  res.json({ books: result.rows });
});

// GET book id
router.get("/:id", async (req, res) => {
  // extract id from the path
  const id = req.params.id;
  // get data from the table
  const result = await db.query(`SELECT * FROM "books" WHERE id = ${id};`);
  const book = result.rows[0];
  // send back a response
  res.json({ book: book });
});

// POST or CREATE a new book
router.post("/", async (req, res) => {
  const result = await db.query(
    `INSERT INTO books (title, type, author, topic, publicationDate, pages) 
    VALUES ('2312', 'Fiction', 'Kim Stanley Robinson', 'science fiction', '2020-09-13T01:03:23.774+01:00', 300 ) returning *`
  );
  res.json({ book: result.rows[0] });
});

//PUT or UPDATE a book
router.put("/:id", async (req, res) => {
  const result = await db.query(`UPDATE "books"
  SET
    title = '2312',
    type = 'Fiction',
    author = 'Kim Stanley Robinson',
    topic = 'science fiction',
    publicationDate = '2020-09-13T01:03:23.774+01:00',
    pages = 300
    WHERE id = 42
    returning *`);
  res.json({ book: result.rows[0] });
  //console.log("THIS IS RESULT:", result);
});

//DELETE book id
router.delete("/:id", async (req, res) => {
  const result = await db.query(`DELETE from "books"
    WHERE id = 42
    returning *`);
  res.json({ book: result.rows[0] });
  //console.log("THIS IS RESULT:", result);
});

module.exports = router;
