const { Schema, model } = require("mongoose");

const locationSchema = new Schema({
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
});

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  // logo: {},
  industry: { type: String },
  hqCity: { type: String, required: true },
  hqState: { type: String, required: true },
  locations: [{ type: Schema.Types.ObjectId, ref: "Location" }],
  website: { type: String, required: true },
  tagline: { type: String },
  bio: { type: String, required: true },
  companySize: { type: String, required: true },
  foundedYear: { type: Number, required: true },
  specialties: { type: String },
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  employees: [{ type: Schema.Types.ObjectId, ref: "User" }],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  jobs: [{ type: Schema.Types.ObjectId, ref: "Job" }],
  admins: [{ type: Schema.Types.ObjectId, ref: "User" }],
  profPic: {
    type: String,
  },
  bannerPic: {
    type: String,
  },
  entitiesFollowed: [{ type: Schema.Types.ObjectId, ref: "Entity" }],
});

companySchema.virtual("followerCount").get(function () {
  return this.followers.length;
});

companySchema.virtual("employeeCount").get(function () {
  return this.employees.length;
});

const Company = model("Company", companySchema);
const Location = model("Location", locationSchema);

module.exports = { Location, Company };
