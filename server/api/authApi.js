const express = require("express");
const router = express.Router({ mergeParams: true });
const {signup, login} = require("../controllers/authController")

router.route('/signup').post(signup);
router.route('/login').post(login);


module.exports = router;