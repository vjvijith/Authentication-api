const express = require('express');
const userControl = require('../controllers/userController');
const auth = require('../middlewares/isAuth');
const upload = require('../middlewares/upload');

const router = express.Router();

router.route('/update').put(auth,upload.single('photo'),userControl.updateProfile);
router.route('/public-profile').get(userControl.listPublicProfile);
router.route('/profile/:name').get(auth,userControl.getUserProfile);

module.exports = router;