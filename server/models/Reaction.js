const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const reactionSchema = new Schema({
  reactionName: { type: String, required: true },
  icon: { type: String, required: true },
});

const Reaction = model("Reaction", reactionSchema);

module.exports = Reaction;
