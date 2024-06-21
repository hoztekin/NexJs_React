const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const port = process.env.PORT || 5000;

//Route
const routes = require("./routes/index.js");

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Mongo Db");
  } catch (error) {
    throw error;
  }
};

// middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use("/api", routes);
// app.get("/", (req, res) => res.send("Merhaba"));
app.listen(port, () => {
  connect();
  console.log(`Dinlenen Port : ${port}`);
});
