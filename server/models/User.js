const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const experienceSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Company",
  },
  title: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  skills: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
  startMonth: {
    type: String,
    required: true,
  },
  startYear: {
    type: Number,
    required: true,
  },
  current: {
    type: Boolean,
    requred: true,
  },
  endMonth: {
    type: String,
    required: true,
  },
  endYear: {
    type: Number,
    required: true,
  },
});

const educationSchema = new Schema({
  school: {
    type: Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },
  fieldOfStudy: {
    type: String,
    required: true,
  },
  certificateType: {
    type: String,
    required: true,
  },
  skills: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
  startMonth: {
    type: String,
    required: true,
  },
  startYear: {
    type: Number,
    required: true,
  },
  current: {
    type: Boolean,
    requred: true,
  },
  endMonth: {
    type: String,
    required: true,
  },
  endYear: {
    type: Number,
    required: true,
  },
});

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  education: [educationSchema],
  experience: [experienceSchema],
  skills: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
  website: { type: String },
  // resumeDoc: {

  // },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  connections: [{ type: Schema.Types.ObjectId, ref: "User" }],
  groups: [{ type: Schema.Types.ObjectId, ref: "Group" }],
  entitiesFollowed: [{ type: Schema.Types.ObjectId, ref: "Entity" }],
  profPic: {
    type: String,
  },
  bannerPic: {
    type: String,
  },
});

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
