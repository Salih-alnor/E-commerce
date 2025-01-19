const express = require("express");

const multer = require("multer");
const path = require("path");
const { auth, allowedToAccess } = require("../controllers/authController");

const router = express.Router({ mergeParams: true });
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(
      null,
      path.join(__dirname, "../Uploads/SubCategoriesImages"),
      (err, path) => {
        if (err) {
          throw err;
        }
        console.log(`Uploaded file: ${file.originalname} to ${path}`);
      }
    );
  },

  filename: (req, file, callback) => {
    callback(
      null,
      "subcategory-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

const {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../controllers/subCategoryController");

router
  .route("/")
  .post(
    auth,
    allowedToAccess("admin"),
    upload.single("image"),
    createSubCategory
  )
  .get(auth, allowedToAccess("user", "admin"), getSubCategories);
router
  .route("/:id")
  .get(auth, allowedToAccess("user", "admin"), getSubCategory)
  .put(auth, allowedToAccess("admin"), updateSubCategory)
  .delete(auth, allowedToAccess("admin"), deleteSubCategory);

module.exports = router;
