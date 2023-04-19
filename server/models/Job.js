const { Schema, model } = require("mongoose");

const jobSchema = new Schema({
  company: { type: Schema.Types.ObjectId, ref: "Company" },
  title: { type: String, required: true },
  responsibilities: { type: String, required: true },
  qualifications: { type: String, required: true },
  schedule: { type: String, required: true },
  salary: { type: Number },
  benefits: { type: String },
  applicants: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  skills: [
    {
      type: Schema.Types.ObjectId,
      ref: "Skill",
    },
  ],
});

const Job = model("Job", jobSchema);

module.exports = Job;
