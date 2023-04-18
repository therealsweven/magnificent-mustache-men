const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const commentSchema = new Schema({
  post: { type: Schema.Types.ObjectId, ref: "Post" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  commentBody: { type: String, required: true },
  reactions: [{ type: Schema.Types.ObjectId, ref: "Reaction" }],
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
