const express = require("express");
const stripe = require("stripe")(
    "sk_test_51Qr4PaKg2ri1qMe4DKAB2gQqERZ8AZpfuaW0FqLVnibCumuPbXrqWjvUiF7GGmHA9rhfFeuMSEGNy1sZJ7SL45e6003cCxCmBQ"
  );
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
const orderApi = require("./api/orderApi")
const {webHook, createPayPalOrder} = require("./controllers/orderController")
// const uploadProfileApi = require("./api/uploadProfileApi")
const path = require("path");
const cors = require('cors');
const bodyParser = require("body-parser");


dotenv.config({ path: "config.env" });
dbConnected()

app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.post("/webhook", express.raw({ type: "application/json" }), webHook);
app.post("/create-paypal-payment/:cartId", createPayPalOrder)



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
app.use('/api/order', orderApi)
// app.use('/api/upload', uploadProfileApi);


app.all('*', (req, res, next) => {
   const error = new Error(`the url ${req.url} is not found`);
   next(error);
})

app.use((err, req, res, next) => {
    res.status(err.code || 403).json({error: err.message})
})



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
