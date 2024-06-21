const User = require('../models/User');
const redisClient= require('../config/redis');

const updateProfile = async(req, res)=>{
    console.log("up in updates");
    const update = req.body;
    if(req.file){
        update.photo = req.file.path;
    }
    try{
        const user = await User.findByIdAndUpdate(req.user.id,update,{new: true}).select('-password');
        res.json(user);
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const listPublicProfile= async(req,res)=>{
    try{
        const user = await User.find({isPublic:true}).select('-password');
        res.json(user)
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const getUserProfile= async(req,res) =>{
    const userName= req.params.name;
    try{
        
        redisClient.get(`userProfile:${userName}`, async(err,cachedData)=>{
           if(err) throw err;
           if(cachedData){
            return res.json(JSON.parse(cachedData));
           }else{
                const user = await User.findOne({username:userName}).select('-password');
                if(!user) return res.status(404).json({msg:'User not found'}); 
                
                if(user.isPublic || req.user.role === 'admin'){
                    redisClient.setex(`userProfile:${userName}`,3600,JSON.stringify(user));
                    res.json(user);
                }  
                else{
                    res.status(403).json({ msg: 'Access denied' });
                }
            }
        });
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
module.exports = {
    updateProfile,
    listPublicProfile,
    getUserProfile
}