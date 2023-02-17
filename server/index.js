const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();
const PORT = 5000;


app.use(bodyParser.json());
app.use(cors());


const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');


const MONGO_URI = `mongodb+srv://lama1234:${process.env.MONGO_PASS}@cluster0.wed4lia.mongodb.net/?retryWrites=true&w=majority`;


mongoose.connect(MONGO_URI, (err) => {
  if(err){
    console.log('Error connecting to mongodb: ', err);
  } else {
    console.log('Connected to mongodb');
  }
});


app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/product', productRoute);
app.use('/cart', cartRoute);
app.use('/order', orderRoute);


app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
})