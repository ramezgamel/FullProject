const articleModel = require("../dateBase/models/article.model");
const resBuilder = require("../helper/resBuilder.helper");
const mongoose= require("mongoose")

module.exports = class Article {
  static add = async (req, res) => {
    try {
      const article = new articleModel({ ...req.body, userId: req.user._id });
      if (req.files) {
        req.files.forEach((img) => {
          article.photos.push(img.path.replace("public\\", ""));
        });
      }
      await article.save();
      resBuilder(res, true, article, "Article added");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static all = async (req, res) => {
    try {
      const articles = await articleModel.find();
      resBuilder(res, true, articles, "Articles Ready");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static getByCategory = async (req, res) => {
    try {
      const articles = await articleModel.find({category: req.params.category});
      resBuilder(res, true, articles, "Articles Ready");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static single = async (req, res) => {
    try {
      const articleId = req.params.articleId.slice(0, -1);
      const article = await articleModel.findById(articleId);
      resBuilder(res, true, article, "Article Fetched");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static del = async (req, res) => {
    try {
      const id = req.params.articleId.slice(0, -1);
      const article = await articleModel.findByIdAndDelete(id);
      resBuilder(res, true, article, "Article deleted");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static addComment = async (req, res) => {
    try {
      const article = await articleModel.findById(req.params.articleId);
      article.comments.push({ ...req.body, userId: req.user._id });
      await article.save();
      resBuilder(res, true, article, "Comment added");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static delComment = async (req, res) => {
    try {
      const article = await articleModel.findById(req.params.articleId);
      article.comments = article.comments.filter(
        (com) => com._id == req.params.commentId && com.userId != req.user._id
      );
      await article.save();
      resBuilder(res, true, article.comments, "Comment deleted");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static addReplay = async (req, res) => {
    try {
      const article = await articleModel.findById(req.params.articleId);
      let commentIndex = article.comments.findIndex(
        (co) => co._id == req.params.commentId
      );
      article.comments[commentIndex].replays.push({
        ...req.body,
        userId: req.user._id,
      });
      await article.save();

      resBuilder(res, true, article, "Replay added");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static delReplay = async (req, res) => {
    try {
      const article = await articleModel.findById(req.params.articleId);
      let commentIndex = article.comments.findIndex(
        (co) => co._id == req.params.commentId
      );

      article.comments[commentIndex].replays = article.comments[
        commentIndex
      ].replays.filter(
        (re) => re._id == req.params.replayId && re.userId != req.user._id
      );

      await article.save();
      resBuilder(
        res,
        true,
        article.comments[commentIndex].replays,
        "Replay Deleted"
      );
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static like = async (req, res) => {
    try {
      const article = await articleModel.findById(req.params.articleId);
      let isLike = article.likes.find((like) =>
        like.userId.equals(req.user._id)
      );
      if (isLike) {
        article.likes = article.likes.filter(
          (like) => !like.userId.equals(req.user._id)
        );
      } else {
        article.likes.push({ userId: req.user._id });
      }
      await article.save();
      resBuilder(res, true, article, "like");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static editArticle = async (req, res) => {
    try {
      const article = await articleModel.findByIdAndUpdate(req.params.articleId, req.body);
      if (req.files) {
        req.files = req.files.map(img => img.path.replace("public\\", ""))
        article.photos = req.files
      }
      await article.save();
      resBuilder(res, true, article, "Article added");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static editComment = async (req, res) => {
    try {
      const article = await articleModel.findById(req.params.articleId);
      const comment = article.comments.find(
        (c) => c._id.equals(req.params.commentId) && c.userId.equals(req.user._id)
      );
      if(!comment)throw new Error("Can't Edit Other Person Comment");
      comment.body = req.body.body;
      await article.save()
      resBuilder(res, true, article, "like");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static editReplay = async (req, res) => {
    try {
      const article = await articleModel.findById(req.params.articleId);
      const comment = article.comments.find((c) =>c._id.equals(req.params.commentId));
      const replay = comment.replays.find(r => r._id.equals(req.params.replayId) && r.userId.equals(req.user._id));
      if(!replay) throw new Error("Can't Edit Other Person Replay")
      replay.body = req.body.body
      await article.save()
      resBuilder(res, true, article, "like");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  
};
