const express = require("express");
const router = express.Router({ mergeParams: true });
const multer = require("multer");
const path = require("path");

const {
  createBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandController");

const { auth, allowedToAccess } = require("../controllers/authController");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(
      null,
      path.join(__dirname, "../Uploads/BrandsImages"),
      (err, path) => {
        if (err) {
          throw err;
        }

        console.log("Uploaded file: " + file.filename + "to: " + path);
      }
    );
  },

  filename: (req, file, callback) => {
    callback(null, "brand-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.use(
  "/:categoryId/:subCategoryId/brands",
  auth,
  allowedToAccess("user", "admin"),
  getBrands
);
router
  .route("/")
  .post(auth, allowedToAccess("admin"), upload.single("image"), createBrand);
router
  .route("/:id")
  .get(auth, allowedToAccess("user", "admin"), getBrand)
  .put(auth, allowedToAccess("admin"), updateBrand)
  .delete(auth, allowedToAccess("admin"), deleteBrand);

module.exports = router;
