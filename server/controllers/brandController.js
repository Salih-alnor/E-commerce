const { brandValidatorSchema } = require("../validators/brandValidator");
const Brand = require("../models/brandModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

/*
  @desc create brand
  @route POST /api/brand
  @access Private
  */
const createBrand = asyncHandler(async (req, res, next) => {
  const { name, mainCategory, subCategory } = req.body;
  const { error } = brandValidatorSchema.validate(req.body);

  if (error) {
    const err = new Error(error.details[0].message);
    return next(err);
  }

  const brand = await Brand.create({
    name,
    slug: slugify(name),
    mainCategory,
    subCategory,
    image: req.file.filename,
  });

  res.json({ data: brand });
});

/*
  @desc get brands
  @route GET /api/brand
  @access Public
  */
const getBrands = asyncHandler(async (req, res) => {
  // let page = req.query.page * 1 || 1;
  // const limit = req.query.limit * 1 || 2;
  // const skip = (page - 1) * limit;
  const { categoryId, subCategoryId } = req.params;
  let filterObject = {};
  if (!categoryId && !subCategoryId) {
    const err = new Error("Please provide category and subcategory");
    err.code = 400;
    return next(err);
  }
  filterObject = { mainCategory: categoryId, subCategory: subCategoryId };

  const brands = await Brand.find(filterObject); /*.skip(skip).limit(limit);*/
  res.json({ brands });
});

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
  const { name, subCategory } = req.body;
  const { id } = req.params;

  try {
    let updateData = { name, slug: slugify(name) };

    if (subCategory) {
      updateData.$addToSet = { subCategory }; // It adds the element without repetition
    }

    const brand = await Brand.findByIdAndUpdate(id, updateData, { new: true });

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.json({ data: brand });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
