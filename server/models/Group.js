const { Schema, model } = require("mongoose");

const groupSchema = new Schema(
  {
    name: { type: String, required: true },
    admins: [{ type: String, ref: "User" }],
    private: {
      type: Boolean,
      required: true,
    },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    joinQuestion: { type: String },
    profPic: {
      type: String,
    },
    bannerPic: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Group = model("Group", groupSchema);

module.exports = Group;
