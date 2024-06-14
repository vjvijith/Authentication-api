const express = require('express');
const mongoose = require('mongoose');
const compression = require('compression');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const config = require('./config/config');
require('dotenv').config();



const app= express();
//routes
const routes= require('./routes/index');

app.use(morgan());
app.use(helmet());
app.use(express.json());
app.use(compression());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use('/uploads',express.static('uploads'));

app.use(cors({
    origin: '*'
}));

mongoose.connect(config.mongoURI)
.then(()=>console.log('MongoDB connected'))
.catch(err=> console.log(err));

app.use('/',routes);


module.exports= app