const Product = require("../models/productModel");
const Brand = require("../models/brandModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

/*
  @desc create product
  @route POST /api/product
  @access Private
  */
const createProduct = asyncHandler(async(req, res, next) => {
  const {
    name,
    price,
    quantity,
    description,
    mainCategoryId,
    subCategoryId,
    brandId,
  } = req.body;

  const brand = await Brand.findById(brandId)
  if (!brand) {
    const err = new Error("Invalid brand");
    err.code = 404;
    return next(err);
  } 




  let updateData = { name:brand.name, slug: slugify(brand.name) };
 
     if (subCategoryId) {
       updateData.$addToSet = { subCategory: subCategoryId }; // It adds the element without repetition
     }
 
     const brandUpdated = await Brand.findByIdAndUpdate(brandId, updateData, { new: true });
 
     if (!brandUpdated) {
       return res.status(404).json({ message: "Brand not found" });
     }

  const productImages = req.files.map((file) => file.filename);

  if (!productImages.length) {
    const err = new Error("Please upload at least one image");
    err.code = 400;
    return next(err);
  }

  const product = await Product.create({
    name,
    slug: slugify(name),
    price,
    quantity,
    description,
    mainCategory: mainCategoryId,
    subCategory: subCategoryId,
    brand: brandId,
    images: productImages,
  });
  if (!product) {
    const err = new Error("Product not created");
    err.code = 500;
    return next(err);
  }

  res.status(200).json(product);
});

/*
  @desc get products
  @route GET /api/product
  @access Public
  */
const getProducts = asyncHandler(async (req, res) => {
  // let page = req.query.page * 1 || 1;
  // const limit = req.query.limit * 1 || 2;
  // const skip = (page - 1) * limit;

  const products = await Product.find({})
    .sort({ createdAt: -1 })
    .populate("mainCategory")
    .populate("subCategory")
    .populate("brand"); /*.skip(skip).limit(limit);*/

  if (!products) {
    const err = new Error("products not found");
    err.code = 404;
    return next(err);
  }
  res.json({ products });
});

/*
  @desc get one product
  @route GET /api/product/:id
  @access Public
  */
const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.json({ results: product.length, data: product });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/*
  @desc update product
  @route PUT /api/product/:id
  @access Private
  */
const updateProduct = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json({ data: product });
  } catch (error) {
    res.json({ message: error });
  }
};

/*
  @desc delete product
  @route DELETE /api/product/:id
  @access Private
  */
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      console.log("No product found with this ID");
      return res
        .status(404)
        .json({ message: `there is not product by this name` });
    }
    console.log("Product found and deleted");
    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
