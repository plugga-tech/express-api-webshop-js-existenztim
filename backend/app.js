const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const indexRouter = require('./routes/api/index');
const usersRouter = require('./routes/api/users');
const productsRouter = require('./routes/api/products');
const ordersRouter = require ('./routes/api/orders');

async function init(){
    try {
    const options = {useNewUrlParser: true, useUnifiedTopology: true}
    await mongoose.connect('mongodb://127.0.0.1:27017/Tim-Sundell', options); 
    console.log('Mongoose connected successful!');
} catch(error) {
    console.error(error)
    }
}
init()

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);

module.exports = app;
