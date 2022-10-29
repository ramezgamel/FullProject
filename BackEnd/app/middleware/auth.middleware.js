const jwt = require("jsonwebtoken");
const patientModel = require("../dateBase/models/patient.model");
const doctorModel = require("../dateBase/models/doc.model");
const resBuilder = require("../helper/resBuilder.helper");

async function Auth(req, res, next) {
  try {
    const token = req.header("Authorization").replace("bearer ", "");
    const decoded = jwt.verify(token, process.env.JWTKEY);
    let user;
    if (decoded.userType == "patient")
      user = await patientModel.findOne({
        _id: decoded._id,
        "tokens.token": token,
      });
    if (decoded.userType == "doctor")
      user = await doctorModel.findOne({
        _id: decoded._id,
        "tokens.token": token,
      });
    if (!user) throw new Error("Can't Auth");
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    resBuilder(res, false, e, e.message);
  }
}

async function AuthDoctor(req, res, next) {
  try {
    if (req.user.userType != "doctor") throw new Error("You are not a doctor");
    next();
  } catch (e) {
    resBuilder(res, false, e, e.message);
  }
  
}
module.exports = { Auth, AuthDoctor };
