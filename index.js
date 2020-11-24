const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoute = require("./routes/user.route");
const productRoute = require("./routes/product.route");
const bidRoute = require("./routes/bid.route");
const orederRoute = require("./routes/order.route");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const app = express();
dotenv.config({ path: "./config/.env" });
//const socket_io = require("socket.io");

//const io = socket_io();

// connect to database
connectDB();

app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads',express.static('uploads'));
app.use(morgan("dev"));
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

//consume routes
app.use("/api/users",userRoute);
app.use("/api/products",productRoute);
app.use("/api/bids",bidRoute);
app.use("/api/orders",orederRoute);



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started in ${process.env.node_dev} mode on ${PORT}`);
});