const Favorite = require("../models/favoriteModel");
const Product = require('../models/productModel');






/*

  @desc Add product to favorite list
  @route POST /api/favorite/:productId
  @access Public

  */

  const addToFavorite = async (req, res) => {
    try {
        const { productId } = req.params;



        const product = await Product.findById(productId);
        if(!product) return res.json({message: 'Product not found'});
        const favorite = await Favorite.findOne({productId});
        if(favorite) return res.json({message: 'Product already in favorite list'});
        const newFavorite = await Favorite.create({productId});

        res.json(newFavorite);

        
        
    } catch (error) {
        res.json(error);
    }
  }



  /*
  
  */
const getFavorites = async (req, res) => {
     try {
        const favorites = await Favorite.find();
        res.json(favorites);
     } catch (error) {
        res.json(error);
     }
}


const getFavorite = async (req, res) => {
    const {productId} = req.params;
    try {
       const favorites = await Favorite.findOne({productId});
       res.json(favorites);
    } catch (error) {
       res.json(error);
    }
}



const deleteFavorite = async (req, res) => {
    const {productId} = req.params;
    try {
        const favorite = await Favorite.findOne({productId});
        if(!favorite) return res.json({message: 'Product not found in favorite list'});
        await Favorite.findOneAndDelete({productId});
        res.json({message: 'Product removed from favorite list'});
    } catch (error) {
        res.json(error);
    }
}

const clearFavorites = async(req, res) => {
    try {
        const favorite = await Favorite.deleteMany({});
        res.status(200).json({message: 'All products removed from favorite list'});
    } catch (error) {
        res.json(error);
    }
}

  module.exports = {
    addToFavorite,
    getFavorites,
    getFavorite,
    deleteFavorite,
    clearFavorites
  }