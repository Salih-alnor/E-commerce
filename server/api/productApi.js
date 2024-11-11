const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname , "../Uploads/ProductsImages"), (err, path) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(`Uploaded file: ${file.originalname} to ${path}`);
        });
    },

    filename: (req, file, callback) => {
         callback(null, "product-" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage });
const {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");


router.route("/").post(upload.array("images"),createProduct).get(getProducts);
router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;
