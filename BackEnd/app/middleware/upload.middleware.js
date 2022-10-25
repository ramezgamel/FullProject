const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/imgs");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

function fileFilter(req, file, cd) {
    if (path.extname(file.originalname) != ".jpg" ) {
      return cd(new Error("Invalid extension"), false);
    } else {
      cd(null, true);
    }
  }

module.exports = multer({
  storage,
  limits: { fileSize: 5000000 },
  fileFilter
});