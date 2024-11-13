const express = require("express");

const multer = require("multer");
const path = require("path");

const router = express.Router({mergeParams: true});
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../uploads/SubCategoriesImages"), (err, path) => {
      if (err) {
        throw err;
      }
      console.log(`Uploaded file: ${file.originalname} to ${path}`);
    });
  },

  filename: (req, file, callback) => {
    callback(null, "subcategory-" + Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({storage });

const {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../controllers/subCategoryController");

router.route("/").post(upload.single("image"), createSubCategory).get(getSubCategories);
router.route("/:id").get(getSubCategory).put(updateSubCategory).delete(deleteSubCategory);

module.exports = router;
