const db = require("../config/connection");
const {
  Entity,
  User,
  Job,
  Post,
  Company,
  School,
  Group,
  Reaction,
  Skill,
} = require("../models");
const userSeeds = require("./userSeeds.json");
const companySeeds = require("./companySeeds.json");
const schoolSeeds = require("./schools.json");
const skillSeeds = require("./skillSeeds.json");
const reactionSeeds = require("./reactionSeeds.json");
const groupSeeds = require("./groupSeeds.json");
const jobSeeds = require("./jobsSeeds.json");


db.once("open", async () => {
  try {
    // ***** SKILLS ***** //
    await Skill.deleteMany({});
    const skills = await Skill.create(skillSeeds);
    console.log("****SKILLS SEEDED****");

    // ***** ENTITY DELETE ***** //
    await Entity.deleteMany({});

    // ***** USERS ***** //
    await User.deleteMany({});
    //add skills;

    userSeeds.map((user) => {
      const userSkills = [];
      const randomNums = Array.from({ length: skillSeeds.length }, () =>
        Math.floor(Math.random() * skillSeeds.length)
      );
      for (i = 0; i < randomNums.length; i++) {
        userSkills.push(skills[randomNums[i]]._id);
        console.log(userSkills);
      }
      user.skills = userSkills;
    });

    const users = await User.create(userSeeds);
    users.forEach((user) => {
      Entity.create({ user: user._id });
    });
    console.log("****USERS AND ENTITIES FOR USER SEEDS SEEDED****");


    // ***** COMPANIES *****
    await Company.deleteMany({});

    // add first user as admin for companies
    companySeeds.forEach((company) => {
      company.admins = [users[0]._id];
    });

    const companies = await Company.create(companySeeds);

    // entities for companies
    companies.forEach((company) => {
      Entity.create({ company: company._id });
    });
    console.log("****COMPANIES AND ENTITIES SEEDED****");

    //******* JOBS ********/
    await Job.deleteMany({});
    await Job.create(jobSeeds);
    console.log("**** JOB SEEDEDD ****");

    // ***** SCHOOLS *****
    await School.deleteMany({});
    // add first user as admin for schools
    for (i = 0; i < 3; i++) {
      schoolSeeds[i].admins = [users[0]._id];
    }
    const schools = await School.create(schoolSeeds);
    // add entities
    schools.forEach((school) => {
      Entity.create({ school: school._id });
    });
    console.log("****SCHOOLS AND ENTITIES SEEDED****");

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
