const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const skillSchema = new Schema({
  skillName: { type: String, required: true },
});

const Skill = model("Skill", skillSchema);

module.exports = Skill;
