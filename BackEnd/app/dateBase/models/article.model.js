const mongoose = require("mongoose");

const articleSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    // userName:{type: String},
    // profileImage:{type:String},
    title: { type: String, trim: true, required: true },
    category:{type: String, required:true},
    body: { type: String, trim: true, required: true },
    photos: [{ type: String, trim: true }],
    likes: [{ userId: { type: mongoose.Schema.Types.ObjectId, required: true } }],
    comments: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true },
        body: { type: String, required: true, trim: true },
        replays: [
          {
            userId: {
              type: mongoose.Schema.Types.ObjectId,
              required: true,
              ref: "User",
            },
            body: { type: String, required: true, trim: true },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("article", articleSchema);
