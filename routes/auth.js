const express= require('express');
const authControl = require('../controllers/authController');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

router.route('/register').post(authControl.register);
router.route('/login').post(authControl.login);
router.route('/profile').get(isAuth,authControl.getProfile);

module.exports = router;