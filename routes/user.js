const express = require('express');
const userControl = require('../controllers/userController');
const auth = require('../middlewares/isAuth');
const upload = require('../middlewares/upload');
const Joi = require('joi');

const router = express.Router();

const updateProfileSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    bio: Joi.string().optional(),
    phone: Joi.string().optional(),
    isPublic: Joi.boolean().optional()
    // Any other fields you want to validate
});

const validateUpdateProfile = (req, res, next) => {
    const { error } = updateProfileSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ msg: error.details[0].message });
    }
    next();
};


router.route('/update').put(auth,upload.single('photo'),userControl.updateProfile,validateUpdateProfile);
router.route('/public-profile').get(userControl.listPublicProfile);
router.route('/profile/:name').get(auth,userControl.getUserProfile);

module.exports = router;