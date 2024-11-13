const slugify = require("slugify");
const SubCategory = require("../models/subCategoryModel");


/*
  @desc create subCategory
  @route POST /api/subcategory
  @access Private
  */
const createSubCategory = async (req, res) => {
  try {
    const imageSubCategory = req.file.filename;

    if(!imageSubCategory) return res.status(400).json({ message: "Image is required" });

    if (!req.body.mainCategory) req.body.mainCategory = req.params.categoryId;

    const { name, mainCategory } = req.body;

    const subCategory = await SubCategory.create({
      name,
      slug: slugify(name),
      mainCategory,
      image: imageSubCategory,
    });

    res.json({ subCategory });
  } catch (error) {
    res.json({ message: error });
  }
};

/*
  @desc get subCategories
  @route GET /api/subcategory
  @access Public
  */
const getSubCategories = async (req, res) => {
  // let page = req.query.page * 1 || 1;
  // const limit = req.query.limit * 1 || 2;
  // const skip = (page - 1) * limit;

  let filterObject = {};
  if (req.params.id)
    filterObject = { mainCategory: req.params.id };
  try {
    const subCategories = await SubCategory.find(
      filterObject
    ); /*.skip(skip).limit(limit);*/
    res.json({ subCategories });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/*
  @desc get one subCategory
  @route GET /api/subcategory/:id
  @access Public
  */
const getSubCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const subCategory = await SubCategory.findById(id);
    res.json({ subCategory });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/*
    @desc update subCategory
    @route PUT /api/subcategory/:id
    @access Private
    */
const updateSubCategory = async (req, res) => {
  const { name, mainCategory } = req.body;
  const { id } = req.params;

  try {
    const subCategory = await SubCategory.findByIdAndUpdate(
      id,
      { name, slug: slugify(name), mainCategory },
      { new: true }
    );

    res.json({ subCategory });
  } catch (error) {
    res.json({ message: error });
  }
};

/*
    @desc delete subCategory
    @route DELETE /api/subcategory/:id
    @access Private
    */
const deleteSubCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const subCategory = await SubCategory.findByIdAndDelete(id);
    if (!subCategory) {
      console.log("No subCategory found with this ID");
      return res
        .status(404)
        .json({ message: `there is not subCategory by this name` });
    }
    console.log("subCategory found and deleted");
    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
