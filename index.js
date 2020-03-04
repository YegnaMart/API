const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// @configure database connection
const connectDB = require("./config/db");

// import the router in which the the request directed into
const user = require('./routes/user.router');
const product = require('./routes/product.route');

// configure authentication middleware
const {checkAuth} = require('./middleware/check-auth');


const app = express();

// config the directory
dotenv.config({ path: "./config/.env" });

// connect to database
connectDB();

app.get("/", (req, res) => {
  res.json({ message: "YegnaMart Kick start" });
});

app.use(cors()); // to enable cross origin resource sharing
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
app.use('/user',user);
app.use('/product',product);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started in ${process.env.node_dev} mode on ${PORT}`);
});
