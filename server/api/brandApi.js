const express = require("express");
const router = express.Router({mergeParams: true});

const {
    createBrand,
    getBrands,
    getBrand,
    updateBrand,
    deleteBrand,
} = require("../controllers/brandController");

router.route("/").post(createBrand).get(getBrands);
router.route("/:id").get(getBrand).put(updateBrand).delete(deleteBrand);

module.exports = router;
