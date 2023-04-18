const db = require("../config/connection");
const {
  User,
  Job,
  Post,
  Company,
  Comment,
  EducationalInstitution,
  Group,
  Reaction,
  Skill,
} = require("../models");
const userSeeds = require("./userSeeds.json");
const companySeeds = require("./companySeeds.json");
const universitySeeds = require("./universities.json");
const skillSeeds = require("./skillSeeds.json");
const reactionSeeds = require("./reactionSeeds.json");
const groupSeeds = require("./groupSeeds.json");

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await User.create(userSeeds);
    console.log("****USERS SEEDED****");

    await Company.deleteMany({});
    await Company.create(companySeeds);
    console.log("****COMPANIES SEEDED****");

    await EducationalInstitution.deleteMany({});
    await EducationalInstitution.create(universitySeeds);
    console.log("****UNIVERSITIES SEEDED****");

    await Skill.deleteMany({});
    await Skill.create(skillSeeds);
    console.log("****SKILLS SEEDED****");

    await Reaction.deleteMany({});
    await Reaction.create(reactionSeeds);
    console.log("****REACTIONS SEEDED****");

    await Group.deleteMany({});
    await Group.create(groupSeeds);
    console.log("****GROUPS SEEDED****");

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
