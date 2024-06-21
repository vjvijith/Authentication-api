const express= require('express');
const authControl = require('../controllers/authController');
const isAuth = require('../middlewares/isAuth');
const Joi = require('joi');

const router = express.Router();

const updateProfileSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    bio: Joi.string().optional(),
    phone: Joi.string().optional(),
    isPublic: Joi.boolean().optional(),
    // Any other fields you want to validate
});

const validateUpdateProfile = (req, res, next) => {
    const { error } = updateProfileSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ msg: error.details[0].message });
    }
    next();
};

router.route('/register').post(authControl.register,validateUpdateProfile);
router.route('/login').post(authControl.login);
router.route('/profile').get(isAuth,authControl.getProfile);

module.exports = router;