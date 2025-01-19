const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { auth, allowedToAccess } = require("../controllers/authController");

const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { getSubCategories } = require("../controllers/subCategoryController");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(
      null,
      path.join(__dirname, "../Uploads/CategoriesImages"),
      (err, path) => {
        if (err) {
          throw err;
        }
        console.log("Uploaded files: ", file.filename, "to", path);
      }
    );
  },

  filename: (req, file, callback) => {
    callback(null, "category-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.use("/:id/subcategories", auth, allowedToAccess('user', 'admin'), getSubCategories);

router
  .route("/")
  .post(auth, allowedToAccess("admin"), upload.single("image"), createCategory)
  .get(auth, allowedToAccess("user", "admin"), getCategories);
router
  .route("/:id")
  .get(auth, allowedToAccess("admin"), getCategory)
  .put(auth, allowedToAccess("admin"), updateCategory)
  .delete(auth, allowedToAccess("admin"), deleteCategory);

module.exports = router;
