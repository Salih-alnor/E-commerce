const Brand = require("../models/brandModel");
const slugify = require("slugify");

/*
  @desc create brand
  @route POST /api/brand
  @access Private
  */
const createBrand = async (req, res) => {
  const { name, mainCategory, subCategory } = req.body;

  try {
    const brand = await Brand.create({
      name,
      slug: slugify(name),
      mainCategory,
      subCategory,
      image: req.file.filename
    });

    res.json({ data: brand });
  } catch (error) {
    res.json({ message: error });
  }
};

/*
  @desc get brands
  @route GET /api/brand
  @access Public
  */
const getBrands = async (req, res) => {
  // let page = req.query.page * 1 || 1;
  // const limit = req.query.limit * 1 || 2;
  // const skip = (page - 1) * limit;
    const {categoryId, subCategoryId} = req.params;
    let filterObject = {};
    if (categoryId && subCategoryId)
      filterObject = { mainCategory: categoryId, subCategory:  subCategoryId};
  try {
    const brands = await Brand.find(filterObject); /*.skip(skip).limit(limit);*/
    res.json({ brands });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/*
  @desc get one brand
  @route GET /api/brand/:id
  @access Public
  */
const getBrand = async (req, res) => {
  const { id } = req.params;
  try {
    const brand = await Brand.findById(id);
    res.json({ results: brand.length, data: brand });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/*
  @desc update brand
  @route PUT /api/brand/:id
  @access Private
  */
const updateBrand = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  try {
    const brand = await Brand.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json({ data: brand });
  } catch (error) {
    res.json({ message: error });
  }
};

/*
  @desc delete brand
  @route DELETE /api/brand/:id
  @access Private
  */
const deleteBrand = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Brand.findByIdAndDelete(id);
    if (!brand) {
      console.log("No brand found with this ID");
      return res.status(404).json({ data: `there is not brand by this name` });
    }
    console.log("brand found and deleted");
    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  createBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
};
