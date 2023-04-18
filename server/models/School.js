const { Schema, model } = require("mongoose");

const schoolSchema = new Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  bio: { type: String, required: true },
  foundedYear: { type: Number },
  studentBody: {
    type: Number,
  },
  website: {
    type: String,
  },
  profPic: {
    type: String,
  },
  bannerPic: {
    type: String,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  entitiesFollowed: [{ type: Schema.Types.ObjectId, ref: "Entity" }],
});

const School = model("School", schoolSchema);

module.exports = School;
