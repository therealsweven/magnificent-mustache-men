const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const postSchema = new Schema({
  user: { type: String, required: true },
  postBody: { type: String, required: true },
  reactions: { type: String },
  comments: { type: String },
});

const Post = model("Post", postSchema);

module.exports = Post;
