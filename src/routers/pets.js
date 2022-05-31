const express = require("express");
const router = express.Router();
const db = require("../../db");

//GET pets type dogs only
router.get("/", async (req, res) => {
  const type = req.query.type;
  let sqlString = 'SELECT * FROM "pets"';
  if (type) {
    sqlString += ` WHERE type = '${type}';`;
  }
  const result = await db.query(sqlString);
  res.json({ pets: result.rows });
});

// GET pet id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.query(`SELECT * FROM "pets" WHERE id = ${id};`);
  const pet = result.rows[0];
  // send back a response
  res.json({ pet: pet });
});

//POST new pet
router.post("/", async (req, res) => {
  const result = await db.query(
    `INSERT INTO pets (name, age, type, breed, microchip) 
    VALUES ('Ollie', '8', 'cat', 'tabby', 'true' ) returning *`
  );
  res.json({ pet: result.rows[0] });
});

module.exports = router;
