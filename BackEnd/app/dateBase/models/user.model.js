const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const articleModel = require("./article.model");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxLength: 20,
    },
    dateOfBirth: { type: Date, required: true },
    password: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      validate: function (v) {
        if (!validator.isEmail(v)) throw new Error("Email is not Valid");
      },
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      lowercase: true,
      trim: true,
      required: true,
    },
    userType: {
      type: String,
      enum: ["patient", "doctor"],
      lowercase: true,
      trim: true,
      default: "patient",
    },
    profileImg: {
      type: String,
      trim: true,
    },
    ID: {
      type: String,
      trim: true,
      required: function () {
        return this.userType == "doctor";
      },
    },
    tokens: [{ token: { type: String, required: true } }],
    history: {
      diagnosis: { type: String },
      treatments: [
        {
          name: { type: String, required: true },
          start: { type: Date, required: true },
          end: { type: Date, required: true },
        },
      ],
      analysis: [
        {
          type: { type: String, required: true },
          date: { type: Date, required: true },
          image: { type: String, required: true },
        },
      ],
    },
  },
  { timestamps: true }
);



userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.tokens;
  delete user.__v;
  return user;
};

userSchema.pre("save", async function () {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.checkPass = async function (user) {
  return await bcrypt.compare(user.password, this.password);
};

userSchema.methods.generate = async function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTKEY);
  this.tokens.push({ token });
  await this.save();
  return token;
};

userSchema.pre("remove", async function () {
  await articleModel.deleteMany({ userId: this._id });
  const Articles = await articleModel.find();
  Articles.forEach(async article => {
    article.comments = article.comments.filter(c => c.userId.equals(this._id));
    article.likes = article.likes.filter(l => l.userId.equals(this._id));
    article.comments.forEach(async c => {
      c.replays = c.replays.filter(r => r.userId.equals(this._id));
    });
    await article.save();
  });
});

module.exports = mongoose.model("User", userSchema);
