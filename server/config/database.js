const mongoose = require("mongoose");

const dbConnected = () => {
    mongoose
  .connect(process.env.DB_URI || "//localhost:27017/ecommerce-api")
  .then((connect) => console.log(`DB Connected: ${connect.connection.host}`))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  });
}

module.exports = dbConnected;