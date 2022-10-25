const jwt = require("jsonwebtoken");
const userModel = require("../dateBase/models/user.model");
const resBuilder = require("../helper/resBuilder.helper")

async function Auth(req, res, next) {
  try {
    const token = req.header("Authorization").replace("bearer ", "");
    const decoded = jwt.verify(token, process.env.JWTKEY);
    const user = await userModel.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) throw new Error("Can't Auth");
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    resBuilder(res, false, e, e.message)
  }
};

async function AuthDoctor(req, res, next) {
  try {
    if(req.user.userType != 'doctor') throw new Error("You are not a doctor")
    next();
  } catch (e) {
    resBuilder(res, false, e, e.message)
  }
}
module.exports = {Auth, AuthDoctor};
