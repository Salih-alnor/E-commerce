const Product = require("../models/productModel");
const slugify = require("slugify");

/*
  @desc create product
  @route POST /api/product
  @access Private
  */
const createProduct = async (req, res) => {
  const {
    name,
    price,
    quantity,
    description,
    mainCategory,
    subCategory,
    brand,
    // sizes
  } = req.body;

  // const sizesArray = JSON.parse(sizes);
 

  try {
    
    const productImages = req.files.map((file) => file.filename);

    // if (!sizesArray.length) {
    //   return res.status(400).json({ message: "Please provide at least one size" });
    // }

    if (!productImages.length) {
      return res.status(400).json({ message: "Please upload at least one image" });
    }

    const product = await Product.create({
      name,
      slug: slugify(name),
      price,
      quantity,
      description,
      mainCategory,
      subCategory,
      brand,
      // sizes: sizesArray,
      images: productImages,
    });

    res.json({ product });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

/*
  @desc get products
  @route GET /api/product
  @access Public
  */
const getProducts = async (req, res) => {
  // let page = req.query.page * 1 || 1;
  // const limit = req.query.limit * 1 || 2;
  // const skip = (page - 1) * limit;

  try {
    const products = await Product.find({}).populate( "mainCategory").populate("subCategory").populate("brand"); /*.skip(skip).limit(limit);*/
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

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
