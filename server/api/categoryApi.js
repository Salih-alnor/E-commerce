const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/categoryController");
const {getSubCategories} = require('../controllers/subCategoryController')

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../Uploads/CategoriesImages"), (err, path) => {
      if (err) {
        throw err;
      }
      console.log('Uploaded files: ', file.filename, "to", path)
    })
  },

  filename: (req, file, callback) => {
    callback(null, 'category-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({storage});



router.use('/:id/subcategories', getSubCategories)

router.route("/").post(upload.single('image'),createCategory).get(getCategories);
router.route("/:id").get(getCategory).put(updateCategory).delete(deleteCategory);

module.exports = router;
