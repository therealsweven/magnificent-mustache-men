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
    reactions: [commentReactionSchema],
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
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    entity: { type: Schema.Types.ObjectId, ref: "Entity", required: true },
    postBody: { type: String, required: true },
    reactions: [postReactionSchema],
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Post = model("Post", postSchema);
const Comment = model("Comment", commentSchema);

module.exports = { Post, Comment };

//User -- posts
//  Company
