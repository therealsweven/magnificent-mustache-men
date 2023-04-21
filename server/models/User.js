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
  },
  endYear: {
    type: Number,
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
  },
  endYear: {
    type: Number,
  },
});

const userSchema = new Schema(
  {
    entityId: { type: Schema.Types.ObjectId, ref: "Entity" },
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
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    education: [{ type: Schema.Types.ObjectId, ref: "Education" }],
    experience: [{ type: Schema.Types.ObjectId, ref: "Experience" }],
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
  },
  {
    timestamps: true,
  }
);

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
const Experience = model("Experience", experienceSchema);
const Education = model("Education", educationSchema);

module.exports = { User, Experience, Education };
