const express = require("express");
const multer = require("multer");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const colors = require("colors");
const cors = require("cors");
const connectDb = require("./utils/database");
const postRouter = require("./routes/postRoute");

const app = express();
app.use(cors());

connectDb();

app.use(express.json());
app.use("/backend/uploads", express.static("backend/uploads"));

app.use("/api/v1/posts", postRouter);
app.use("*", (request, response) => {
  response.status(404).json({ message: "No route found" });
});

app.listen(1500, () => console.log(`Server listening`));
