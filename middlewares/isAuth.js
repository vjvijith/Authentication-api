const jwt = require('jsonwebtoken');
const config = require('../config/config');
///const User = require('../models/User');

module.exports =(req,res,next)=>{
    const token = req.header('Authorization');
    console.log(token);
    if(!token) {
        return res.status(401).json({msg:'No Token, authorization denied'});
    }
    try{
        const decoded = jwt.verify(token,config.jwtSecret);
        req.user = decoded;
        console.log(req.user);
        next();
    } catch(err){
        res.status(401).json({msg: 'Token is not valid'});
    }

};