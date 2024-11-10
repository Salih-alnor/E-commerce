const express = require("express");
const router = express.Router({mergeParams: true});

const {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../controllers/subCategoryController");

router.route("/").post(createSubCategory).get(getSubCategories);
router.route("/:id").get(getSubCategory).put(updateSubCategory).delete(deleteSubCategory);

module.exports = router;
