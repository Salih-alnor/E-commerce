const express = require("express");
const dotenv = require("dotenv");

const mongoose = require("mongoose");
dotenv.config({ path: "config.env" });
mongoose
  .connect(process.env.DB_URI)
  .then((connect) => console.log(`DB Connected: ${connect.connection.host}`))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  });



const app = express();

const PORT = process.env.PORT;

app.get("/home", (req, res) => {
  res.json({ message: "home page" });
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
