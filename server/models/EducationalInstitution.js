const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const educationalInstitutionSchema = new Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  bio: { type: String },
  foundedYear: { type: Number },
  studentBody: {
    type: Number,
  },
  website: {
    type: String,
  },
  image: {
    type: String,
  },
  bannerPic: {
    type: String,
  },
});

const EducationalInstitution = model(
  "EducationalInstitution",
  educationalInstitutionSchema
);

module.exports = EducationalInstitution;
