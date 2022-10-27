const articleModel = require("../dateBase/models/article.model");
const bookingModel = require("../dateBase/models/booking.model");
const patientModel = require("../dateBase/models/patient.model");
const doctorModel = require("../dateBase/models/doc.model");
const resBuilder = require("../helper/resBuilder.helper");

class User {
  static checkModel = async function (modelName) {
    if (modelName == "patient") return patientModel;
    if (modelName == "doctor") return doctorModel;
  };

  static register = async (req, res) => {
    try {
      let model = await this.checkModel(req.body.userType);
      let user = model(req.body);
      await user.save();
      resBuilder(res, true, user, "registered");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static login = async (req, res) => {
    try {
      let model = await this.checkModel(req.body.userType);
      let user = await model.findOne({ email: req.body.email });
      // let user;
      // if (req.body.userType == "patient") user = await patientModel.findOne({ email: req.body.email });
      // if (req.body.userType == "doctor") user = await doctorModel.findOne({ email: req.body.email });
      if (!user) throw new Error("Invalid email or password");
      const isRightPass = await user.checkPass(req.body.password);
      if (!isRightPass) throw new Error("Invalid email or password");
      if (user.tokens.length >= 3)
        throw new Error("Can't login from more devices");
      const token = await user.generateToken();
      await user.save();
      resBuilder(res, true, { token }, "Logged In");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static logout = async (req, res) => {
    try {
      let model = await this.checkModel(req.user.userType);
      let user = await model.findById(req.user._id);
      // let user;
      // if (req.user.userType == "patient") user = await patientModel.findById(req.user._id);
      // if (req.user.userType == "doctor") user = await doctorModel.findById(req.user._id);
      user.tokens = user.tokens.filter((t) => t.token != req.token);
      await user.save();
      resBuilder(res, true, user, "Logged out");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static logoutAll = async (req, res) => {
    try {
      let model = await this.checkModel(req.user.userType);
      let user = await model.findById(req.user._id);
      // let user;
      // if (req.user.userType == "patient") user = await patientModel.findById(req.user._id);
      // if (req.user.userType == "doctor") user = await doctorModel.findById(req.user._id);
      user.tokens = [];
      await user.save();
      resBuilder(res, true, user, "Logged out");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static profile = async (req, res) => {
    try {
      let model = await this.checkModel(req.user.userType);
      let user = await model.findById(req.user._id);
      // let user;
      // if (req.user.userType == "patient")
      //   user = await patientModel.findById(req.user._id);
      // if (req.user.userType == "doctor")
      //   user = await doctorModel.findById(req.user._id);
      const articles = await articleModel.find({ userId: req.user._id });
      if (!user) throw new Error(`Can't find user`);
      resBuilder(res, true, { user, articles }, "Profile Fetched");
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
      let model = await this.checkModel(req.user.userType);
      let user = await model.findById(req.user._id);
      // const user = await patientModel.findById(req.user.id);
      await user.remove();
      resBuilder(res, true, user, "Added");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
          // Start New Work From Here
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
      const user = await patientModel.findByIdAndUpdate(
        req.user._id,
        req.body,
        {
          runValidators: true,
        }
      );
      if (!user) throw new Error(`Can't find user`);
      resBuilder(res, true, user, "Edited");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static getAppointment = async (req, res) => {
    try {
      const appointment = bookingModel(req.body);
      await appointment.save();
      resBuilder(res, true, appointment, "Added");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
}

module.exports = User;
