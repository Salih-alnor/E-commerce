const express = require("express");
const dotenv = require("dotenv");
const dbConnected = require("./config/database")
const categoryApi = require("./api/categoryApi")
const subCategoryApi = require("./api/subCategoryApi")
const brandApi = require("./api/brandApi")
const productApi = require("./api/productApi")
dotenv.config({ path: "config.env" });

dbConnected()


const app = express();
app.use(express.json())

// apis
app.use('/api/category', categoryApi);
app.use('/api/subcategory', subCategoryApi);
app.use('/api/brand', brandApi);
app.use('/api/product', productApi);



const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
