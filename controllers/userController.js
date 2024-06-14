const User = require('../models/User');

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
    try{
        
        const user= await User.findOne({name:req.params.name}).select('-password');
        console.log(user);
        if(!user) return res.status(404).json({msg:'User not found'});
        console.log(req.user.role);
        if(user.isPublic || req.user.role === 'admin')
            res.json(user);
        else{
            res.status(403).json({ msg: 'Access denied' });
        }
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