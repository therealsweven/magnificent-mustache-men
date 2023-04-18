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

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await User.create(userSeeds);

    await Company.deleteMany({});
    await Company.create(companySeeds);

    await EducationalInstitution.deleteMany({});
    await EducationalInstitution.create(universitySeeds);

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
