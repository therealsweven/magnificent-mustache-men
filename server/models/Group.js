const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const groupSchema = new Schema({
  name: { type: String, required: true },
  admins: [{ type: String, ref: "user" }],
  private: {
    type: Boolean,
    required: true,
  },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  joinQuestion: { type: String },
});

const Group = model("Group", groupSchema);

module.exports = Group;
