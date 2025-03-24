const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const { auth, allowedToAccess } = require("../controllers/authController");

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(
      null,
      path.join(__dirname, "../Uploads/ProductsImages"),
      (err, path) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(`Uploaded file: ${file.originalname} to ${path}`);
      }
    );
  },

  filename: (req, file, callback) => {
    callback(null, "product-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router
  .route("/")
  .post(auth, allowedToAccess("user", "admin"), upload.array("images"), createProduct)
  .get(auth, allowedToAccess("user", "admin"), getProducts);
router
  .route("/:id")
  .get(auth, allowedToAccess("user", "admin"), getProduct)
  .put(auth, allowedToAccess("admin"), updateProduct)
  .delete(auth, allowedToAccess("admin"), deleteProduct);

module.exports = router;
