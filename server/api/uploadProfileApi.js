const router = require('express').Router();
const multer = require('multer')
const path = require('path'); 
const fs = require('fs')
const  User = require("../models/user");

let fileName = '';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../Uploads/ProfileImage'))
    },
    filename: (req, file, cb) => {
        let fl = "profile-" + Date.now() + path.extname(file.originalname);
        cb(null, fl );
        fileName = fl;
    }
})

const upload = multer({storage})


router.put('/:id', upload.single('image'), async(req, res) => {
    try {
        const userProfile = await User.findById(req.params.id)
        const link = path.join(__dirname, '../Uploads/ProfileImage', userProfile.profile)
        // console.log(link);
       fs.unlink(link , err => {
            if(err) return console.log(err);
        });

        await User.findByIdAndUpdate(req.params.id, {$set: {
            profile: fileName,
        }},{new: true})
        fileName = '';

        res.status(200).json({message: 'image uploaded'})
    } catch (error) {
        res.json({message: 'something wrong'})
    }
})

module.exports = router