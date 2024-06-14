const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const bycrpt = require('bcryptjs');

const register = async (req, res)=>{
    const {name,email,password,isPublic}= req.body;
    try{
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg:"User already exist"})
        }
        user = new User({name: name,email: email,password: password,isPublic: isPublic});
        const salt= await bycrpt.genSalt(10);
        user.password = await bycrpt.hash(password,salt);
        await user.save();

        // const payload = {user: { id: user.id }};
        // const token = jwt.sign(payload,config.jwtSecret,{expiresIn:'1h'});
        res.json(user);
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
const login = async(req, res)=>{
    const data = req.body;
    
    try{
        const user = await User.findOne({email:data.email});
        if(!user) return res.status(401).json({msg:'Invalid Credential'});
        
        const isMatch = await bycrpt.compare(data.password, user.password);
        if(!isMatch) return res.status(401).json({msg:'Invalid Credential'});

        const payload = {id: user.id, role: user.role};
        const token = jwt.sign(payload,config.jwtSecret,{expiresIn: '1h'});
        res.json({token});
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    
};
const getProfile = async(req,res)=>{
    try{
        const user = await User.findById(req.user.id).select("-password");
        res.json({user});
        if(!user) return res.status(404).json({msg:'User not found'})
    } catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
module.exports = {
    register,
    login,
    getProfile
}