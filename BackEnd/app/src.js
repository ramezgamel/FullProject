//global
require("dotenv").config();
require("./dateBase/connect");

// imports as var
const express = require("express");
const path = require("path");
const app = express();
<<<<<<< HEAD
const cors = require("cors")
=======
const cors = require("cors");
>>>>>>> 9141c97 (work on some pages)

//Settings
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
<<<<<<< HEAD
app.use(cors())
=======
app.use(cors());
>>>>>>> 9141c97 (work on some pages)

//Routes
const userRoutes = require("./routes/user.routes");
const articleRoutes = require("./routes/article.routes");
app.use(userRoutes);
app.use("/article", articleRoutes);

module.exports = app;
