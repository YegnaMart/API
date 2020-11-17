const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoute = require("./routes/user.route");
const productRoute = require("./routes/product.route");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const app = express();
dotenv.config({ path: "./config/.env" });
const socket_io = require("socket.io");



// app.listen(3000, function () {
//     console.log('Node started on port 3000!')
// });
const io = socket_io();

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



const PORT = process.env.PORT || 4000;
io.listen(app.listen(PORT, () => {
  console.log(`Server started in ${process.env.node_dev} mode on ${PORT}`);
}));