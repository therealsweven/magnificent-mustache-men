const { Schema, model } = require("mongoose");

const commentReactionSchema = new Schema({
  entity: { type: Schema.Types.ObjectId, ref: "Entity" },
  reactionId: { type: Schema.Types.ObjectId, ref: "Reaction" },
});

const commentSchema = new Schema({
  entity: { type: Schema.Types.ObjectId, ref: "Entity" },
  commentBody: { type: String, required: true },
  reactions: [commentReactionSchema],
});

const postReactionSchema = new Schema({
  entity: { type: Schema.Types.ObjectId, ref: "Entity" },
  reactionId: { type: Schema.Types.ObjectId, ref: "Reaction" },
});

const postSchema = new Schema({
  user: { type: String, ref: "User", required: true },
  entity: { type: String, ref: "Entity", required: true },
  postBody: { type: String, required: true },
  reactions: [postReactionSchema],
  comments: [commentSchema],
});

const Post = model("Post", postSchema);

module.exports = Post;

//User -- posts
//  Company
