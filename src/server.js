const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//TODO: Implement books and pets APIs using Express Modular Routers
const booksRouter = require("./routers/books.js");
const petsRouter = require("./routers/pets.js");

app.use("/pets", petsRouter);
app.use("/books", booksRouter);

module.exports = app;
