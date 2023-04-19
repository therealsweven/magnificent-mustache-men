const { Schema, model } = require("mongoose");

const entitySchema = new Schema({
  school: { type: Schema.Types.ObjectId, ref: "School" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  company: { type: Schema.Types.ObjectId, ref: "Company" },
});

const Entity = model("Entity", entitySchema);

module.exports = Entity;
