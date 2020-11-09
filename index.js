const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoute = require("./routes/user.route");
const connectDB = require("./config/db");
const app = express();
dotenv.config({ path: "./config/.env" });

// connect to database
connectDB();

app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

//use consume routes
app.use("/api/users",userRoute);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started in ${process.env.node_dev} mode on ${PORT}`);
});