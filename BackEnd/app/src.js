//global
require("dotenv").config();
require("./dateBase/connect");

// imports as var
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors")

//Settings
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(cors())

//Routes
const userRoutes = require("./routes/user.routes");
const articleRoutes = require("./routes/article.routes");
app.use(userRoutes);
app.use("/article", articleRoutes);

module.exports = app;
