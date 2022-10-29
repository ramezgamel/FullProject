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
    profileImg: {
      type: String,
      trim: true,
    },
    userType: {
      type: String,
      lowercase: true,
      trim: true,
      enum: ["patient", "doctor"],
      required: true,
    },
    tokens: [{ token: { type: String, required: true } }],
    history: [
      {
        diagnosis: { type: String },
        treatments: [
          {
            name: { type: String, required: true },
            start: { type: String, required: true, trim:true },
            end: { type: String, required: true, trim:true },
          },
        ],
        analysis: [
          {
            type: { type: String, required: true },
            date: { type: String, required: true, trim:true },
            image: { type: String },
          },
        ],
        comment:{type:String}
      },
    ],
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

userSchema.methods.checkPass = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

userSchema.methods.generateToken = async function () {
  const token = jwt.sign(
    { _id: this._id, userType: this.userType },
    process.env.JWTKEY
  );
  this.tokens.push({ token });
  await this.save();
  return token;
};

userSchema.pre("remove", async function () {
  await articleModel.deleteMany({ userId: this._id });
  const Articles = await articleModel.find();
  Articles.forEach(async (article) => {
    article.comments = article.comments.filter((c) =>
      c.userId.equals(this._id)
    );
    article.likes = article.likes.filter((l) => l.userId.equals(this._id));
    article.comments.forEach(async (c) => {
      c.replays = c.replays.filter((r) => r.userId.equals(this._id));
    });
    await article.save();
  });
});

module.exports = mongoose.model("Patient", userSchema);
