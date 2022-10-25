const articleModel = require("../dateBase/models/article.model");
const userModel = require("../dateBase/models/user.model");
const resBuilder = require("../helper/resBuilder.helper");

class User {
  static register = async (req, res) => {
    try {
      if (!(await userModel.find({ email: req.body.email })))
        throw new Error("Email invalid");
      const user = userModel(req.body);
      await user.save();
      resBuilder(res, true, user, "registered");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static login = async (req, res) => {
    try {
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) throw new Error("Invalid email or password");
      const isRightPass = await user.checkPass(req.body);
      if (!isRightPass) throw new Error("Invalid email or password");
      if (user.tokens.length >= 3)
        throw new Error("Can't login from more devices");
      const token = await user.generate();
      await user.save();
      resBuilder(res, true, { token }, "Logged In");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static logout = async (req, res) => {
    try {
      const user = await userModel.findById(req.user._id);
      user.tokens = user.tokens.filter((t) => t.token != req.token);
      await user.save();
      resBuilder(res, true, user, "Logged out");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static logoutAll = async (req, res) => {
    try {
      const user = await userModel.findById(req.user._id);
      user.tokens = [];
      await user.save();
      resBuilder(res, true, user, "Logged out");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static profile = async (req, res) => {
    try {
      const user = await userModel.findById(req.user._id);
      const articles = await articleModel.find({ userId: req.user._id });
      if (!user) throw new Error(`Can't find user`);
      resBuilder(res, true, { user, articles }, "Profile Fetched");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static editProfile = async (req, res) => {
    try {
      const noEdit = ["email", "password", "tokens"];
      const allow = Object.keys(req.body).every((el) => !noEdit.includes(el));
      if (!allow) throw new Error("Can't Edit Email or Password");
      if (
        Object.keys(req.body).includes("history") &&
        req.user.userType == "patient"
      )
        throw new Error("should be a doctor to Edit it");
      const user = await userModel.findByIdAndUpdate(req.user._id, req.body, {
        runValidators: true,
      });
      if (!user) throw new Error(`Can't find user`);
      resBuilder(res, true, user, "Edited");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static profileImg = async (req, res) => {
    try {
      let result;
      if (req.file) {
        req.user.profileImg = req.file.path.replace("public\\", "");
        result = req.user.profileImg;
        await req.user.save();
      } else {
        throw new Error("no photo to add");
      }
      resBuilder(res, true, result, "Added");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static deleteProfile = async (req, res) => {
    try {
      const user = await userModel.findById(req.user.id);
      await user.remove()
      resBuilder(res, true, user, "Added");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
}

module.exports = User;
