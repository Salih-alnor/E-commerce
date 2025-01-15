const express = require("express");
const router = express.Router({ mergeParams: true });
const multer = require("multer");
const path = require("path");



const {
    createUser,
    getUsers,
    getUser,
} = require("../controllers/userController");


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "../Uploads/ProfileImage"), (err, path) => {
            if (err) {
                throw err;
            }

            console.log("Uploaded file: " + file.filename + "to: " + path);
        })
    },

    filename: (req, file, callback) => {
      callback(null, "profile-" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage});

router
  .route("/")
  .post(upload.single('image'),createUser)
 

  router.route("/login").post(getUser)
  

  router.get("/users",getUsers )
 


module.exports = router;