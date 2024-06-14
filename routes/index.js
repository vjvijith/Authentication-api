const express= require('express');
const auth= require('./auth');
const user= require('./user');

const app= express.Router();

app.use('/api/auth',auth);
app.use('/api/user',user);

module.exports= app;