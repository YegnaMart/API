const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require('dotenv');
const connectDB = require("./config/db");


const app = express();

// config the directory
dotenv.config({ path: "./config/.env" });

// connect to database
connectDB();

app.get("/", (req, res) => {
  res.json({ message: "YegnaMart Kick start" });
});

app.use(cors()); // to enable cross origin resource sharing
app.use(morgan("dev"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started in ${process.env.node_dev} mode on ${PORT}`);
});
