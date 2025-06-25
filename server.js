const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI);
console.log("mongoDB connected");

app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
});
