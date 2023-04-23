const { Schema, model } = require("mongoose");

const commentReactionSchema = new Schema(
  {
    entity: { type: Schema.Types.ObjectId, ref: "Entity" },
    reactionId: { type: Schema.Types.ObjectId, ref: "Reaction" },
  },
  {
    timestamps: true,
  }
);

const commentSchema = new Schema(
  {
    entity: { type: Schema.Types.ObjectId, ref: "Entity" },
    commentBody: { type: String, required: true },
    reactions: { type: Schema.Types.ObjectId, ref: "CommentReaction" },
  },
  {
    timestamps: true,
  }
);

const postReactionSchema = new Schema(
  {
    entity: { type: Schema.Types.ObjectId, ref: "Entity" },
    reactionId: { type: Schema.Types.ObjectId, ref: "Reaction" },
  },
  {
    timestamps: true,
  }
);

const postSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    entity: { type: Schema.Types.ObjectId, ref: "Entity", required: true },
    postBody: { type: String, required: true },
    reactions: [{ type: Schema.Types.ObjectId, ref: "PostReaction" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);

const Post = model("Post", postSchema);
const PostReaction = model("PostReaction", postReactionSchema);
const Comment = model("Comment", commentSchema);
const CommentReaction = model("CommentReaction", commentReactionSchema);

module.exports = { Post, Comment, PostReaction, CommentReaction };

//User -- posts
//  Company
