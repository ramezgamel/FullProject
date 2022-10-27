const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

const doctorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxLength: 20,
    },
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
    userType: {
      type: String,
      lowercase: true,
      trim: true,
      enum: ["patient", "doctor"],
      required: true,
    },
    profileImg: {
      type: String,
      trim: true,
    },
    ID: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    specialty: [{ type: String, required: true }],
    addresses: [{ type: String, trim: true }],
    phone: { type: String },
    Bookings: [
      { patientName: { type: String, required: true }, date: { type: Date } },
    ],
    tokens: [{ token: { type: String, required: true } }],
  },
  { timestamps: true }
);

doctorSchema.methods.toJSON = function(){
  const doc = this.toObject();
  delete doc.password;
  delete doc.tokens;
  delete doc.__v;
  return doc
} 

doctorSchema.methods.generateToken = async function(){
  let token = jwt.sign({ _id: this._id , userType: this.userType}, process.env.JWTKEY);
  this.tokens.push({token});
  await this.save();
  return token
}

doctorSchema.pre('save', async function(){
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 12);
});

doctorSchema.methods.checkPass = async function(userPassword){
  return bcrypt.compare(userPassword, this.password)
}

module.exports = mongoose.model("Doctor", doctorSchema)