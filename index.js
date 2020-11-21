const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// @configure database connection
const connectDB = require('./config/db');

// import the router in which the the request directed into
const userRouter = require('./routes/user.router');
const productRouter = require('./routes/product.route');
const orderRouter = require('./routes/order.route');
const bidRouter = require('./routes/bid.route');
const feedbackRouter = require('./routes/feedback.route');
const vehicleRouter = require('./routes/vehicle.route');
const warehouseRouter = require('./routes/warehouse.route');
const deliveryRouter = require('./routes/delivery.route');
// create instance of the app
const app = express();

// config the directory
dotenv.config({ path: './config/.env' });

// connect to database
connectDB();

app.get('/', (req, res) => {
  res.json({ message: 'YegnaMart Kick start' });
});

app.use(cors()); // to enable cross origin resource sharing
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use('/bid', bidRouter);
app.use('/feedback', feedbackRouter);
app.use('/delivery', deliveryRouter);
app.use('/vehicle', vehicleRouter);
app.use('/warehouse', warehouseRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started in ${process.env.node_dev} mode on ${PORT}`);
});
