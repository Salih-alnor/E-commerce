const express = require("express");
const router = express.Router({ mergeParams: true });
const {signup, login, auth, allowedToAccess} = require("../controllers/authController")

router.route('/register').post(signup);
router.route('/login').post(login);


module.exports = router;