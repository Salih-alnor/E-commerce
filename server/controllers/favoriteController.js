const Favorite = require("../models/favoriteModel");
const Product = require("../models/productModel");

/*

  @desc Add product to favorite list
  @route POST /api/favorite/:productId
  @access Public

  */

const addToFavorite = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) return res.json({ message: "Product not found" });
    const favorite = await Favorite.findOne({ productId });
    if (favorite){
      const favorites = await Favorite.find().sort({ createdAt: -1 }).populate("productId");
      return res.json({ message: "Product already in favorites list", favoritesList: favorites});
    }
      
    await Favorite.create({ productId });
    const updatedFavoriteList = await Favorite.find().sort({ createdAt: -1 }).populate("productId");

    res.json({ message: "Product added successfully", favoritesList: updatedFavoriteList });
  } catch (error) {
    res.json(error);
  }
};

/*
  
  */
const getFavorites = async (req, res) => {
  try {
    const favoritesList = await Favorite.find().sort({ createdAt: -1 }).populate("productId");
    if (favoritesList.length === 0)
      return res.json({ message: "No favorite products found" });
    res.json(favoritesList);
  } catch (error) {
    res.json(error);
  }
};

const getFavorite = async (req, res) => {
  const { productId } = req.params;
  try {
    const favorite = await Favorite.findOne({ productId });
    if (!favorite)
      return res.json({ message: "Product not found in favorite list" });
    res.json(favorite);
  } catch (error) {
    res.json(error);
  }
};

const deleteFavorite = async (req, res) => {
  const { productId } = req.params;
  try {
    const favorite = await Favorite.findOne({ productId });
    if (!favorite)
      return res.json({ message: "Product not found in favorite list" });

    await Favorite.findOneAndDelete({ productId });

    const favoritesList = await Favorite.find().populate("productId");
    if (favoritesList.length === 0)
      return res.json({ message: "No favorite products found" });

    res.json({ message: "Product removed from favorite list", favoritesList });
  } catch (error) {
    res.json(error);
  }
};

const clearFavorites = async (req, res) => {
  try {
    const favorite = await Favorite.deleteMany({});
    if (favorite.deletedCount === 0)
      return res.json({ message: "No favorite products found" });
    res
      .status(200)
      .json({ message: "All products removed from favorite list" });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  addToFavorite,
  getFavorites,
  getFavorite,
  deleteFavorite,
  clearFavorites,
};
