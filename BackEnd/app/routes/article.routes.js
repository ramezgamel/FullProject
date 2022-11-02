const router = require("express").Router();
const Article = require("../controller/article.controller");
const { Auth, AuthDoctor } = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

router.get("/all", Auth, Article.all);
router.get("/all/:category", Auth, Article.getByCategory);
router.get("/single/:articleId", Auth, Article.single);

router.post("/add", Auth, upload.array("imgs", 9), Article.add);
router.post("/addComment/:articleId", Auth, AuthDoctor, Article.addComment);
router.post("/addReplay/:articleId/:commentId", Auth, Article.addReplay);
router.post("/like/:articleId", Auth, Article.like);

router.patch(
  "/edit/:articleId",
  Auth,
  upload.array("imgs", 9),
  Article.editArticle
);
router.patch("/editComment/:articleId/:commentId", Auth, Article.editComment);
router.patch(
  "/editReplay/:articleId/:commentId/:replayId",
  Auth,
  Article.editReplay
);

router.delete("/:articleId/:commentId", Auth, Article.delComment);
router.delete("/:articleId", Auth, Article.del);

module.exports = router;
