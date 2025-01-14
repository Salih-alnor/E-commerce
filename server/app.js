const express = require("express");
const app = express();
const dotenv = require("dotenv");
const dbConnected = require("./config/database")
const categoryApi = require("./api/categoryApi")
const subCategoryApi = require("./api/subCategoryApi")
const brandApi = require("./api/brandApi")
const productApi = require("./api/productApi")
const favoriteApi = require("./api/favoriteApi")
const cartApi = require("./api/cartApi")
const userApi = require("./api/userApi")
const authApi = require("./api/authApi")
// const uploadProfileApi = require("./api/uploadProfileApi")
const path = require("path");
const cors = require('cors');


dotenv.config({ path: "config.env" });
dbConnected()

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())



app.use(express.static(path.join(__dirname, 'Uploads')))

// apis
app.use('/api/category', categoryApi);
app.use('/api/subcategory', subCategoryApi);
app.use('/api/brand', brandApi);
app.use('/api/product', productApi);
app.use('/api/favorite', favoriteApi);
app.use('/api/cart', cartApi);
app.use('/api/user', userApi);
app.use('/api/auth', authApi);
// app.use('/api/upload', uploadProfileApi);

app.all('*', (req, res, next) => {
   const error = new Error(`the url ${req.url} is not found`);
   next(error);
})

app.use((err, req, res, next) => {
    res.status(400).json({error: err.message})
})



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
