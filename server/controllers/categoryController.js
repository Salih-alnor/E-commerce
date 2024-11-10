const Category = require("../models/categoryModel");
const slugify = require("slugify");

/*
  @desc create category
  @route POST /api/category
  @access Private
  */
const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const category = await Category.create({ name, slug: slugify(name) });

    res.json({ data: category });
  } catch (error) {
    res.json({ message: error });
  }
};

/*
  @desc get categories
  @route GET /api/category
  @access Public
  */
const getCategories = async (req, res) => {
  // let page = req.query.page * 1 || 1;
  // const limit = req.query.limit * 1 || 2;
  // const skip = (page - 1) * limit;

  try {
    const categories = await Category.find({}); /*.skip(skip).limit(limit);*/
    res.json({ results: categories.length, data: categories });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/*
  @desc get one category
  @route GET /api/category/:id
  @access Public
  */
const getCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    res.json({ results: category.length, data: category });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/*
  @desc update category
  @route PUT /api/category/:id
  @access Private
  */
const updateCategory = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json({ data: category });
  } catch (error) {
    res.json({ message: error });
  }
};

/*
  @desc delete category
  @route DELETE /api/category/:id
  @access Private
  */
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      console.log("No category found with this ID");
      return res
        .status(404)
        .json({ message: `there is not category by this name` });
    }
    console.log("Category found and deleted");
    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
