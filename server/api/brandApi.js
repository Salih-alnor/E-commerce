const express = require("express");
const router = express.Router({mergeParams: true});
const multer = require("multer");
const path = require("path");

const {
    createBrand,
    getBrands,
    getBrand,
    updateBrand,
    deleteBrand,
} = require("../controllers/brandController");

const {auth} = require("../controllers/authController")

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "../Uploads/BrandsImages"), (err, path) => {
            if (err) {
                throw err;
            }

            console.log("Uploaded file: " + file.filename + "to: " + path);
        })
    },

    filename: (req, file, callback) => {
      callback(null, "brand-" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage});

router.use('/:categoryId/:subCategoryId/brands', getBrands)

router.route("/").post(auth, upload.single('image'), createBrand).get(getBrands);
router.route("/:id").get(getBrand).put(updateBrand).delete(deleteBrand);

module.exports = router;
