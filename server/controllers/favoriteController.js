const Product = require("../models/productModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

/*

  @desc Add product to favorite list
  @route POST /api/favorite/:productId
  @access Public

  */

const addToFavorite = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  if (!productId) {
    const err = new Error("Product ID is required");
    err.statusCode = 400;
    return next(err);
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: {
        favoritesList: productId,
      },
    },
    { new: true }
  ).populate("favoritesList");

  res
    .status(200)
    .json({
      favoritesList: user.favoritesList,
      message: "Product add to favorites successfully!",
    });
});

/*

  @desc Remove product from favorite list
  @route DELETE /api/favorite/:productId
  @access Public

*/

const deleteFavorite = asyncHandler( async(req, res, next) => {
  const { productId } = req.params;

  if (!productId) {
    const err = new Error("Product ID is required");
    err.statusCode = 400;
    return next(err);
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: {
        favoritesList: productId,
      },
    },
    { new: true }
  );

  res
    .status(200)
    .json({
      data: user.favoritesList,
      message: "Product removed from favorites successfully!",
    });
})


const getFavorites = asyncHandler(async (req, res, next) => {
const {favoritesList} = await User.findById(req.user._id).populate("favoritesList")
  if (!favoritesList) {
    const err = new Error("No favorites found");
    err.statusCode = 404;
    return next(err);
  }
  res.status(200).json({status: "success", favoritesList})

  res.json({
    data: favoritesList,
    message: "Favorites list",
  });
});





const clearFavorites = async (req, res) => {
  try {
    const favoritelist = await Favorite.find().populate("productId");
    for (let favorite of favoritelist) {
      const product = await Product.findById(favorite.productId);
      product.isFavorite = false;
      await product.save();
    }
    await Favorite.deleteMany({});

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

  deleteFavorite,
  clearFavorites,
};
