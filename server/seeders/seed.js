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
const postSeeds = require("./postSeeds.json");

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
      const userSkills = new Set();
      const randomNums = Array.from({ length: skillSeeds.length }, () =>
        Math.floor(Math.random() * skillSeeds.length)
      );
      for (i = 0; i < randomNums.length; i++) {
        userSkills.add(skills[randomNums[i]]._id);
      }
      user.skills = [...userSkills];
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
    console.log("**** JOB SEEDEDD ****");
    jobSeeds.map((job) => {
      const jobSkills = [];
      const randomNums = Array.from({ length: skillSeeds.length }, () =>
        Math.floor(Math.random() * skillSeeds.length)
      );
      for (i = 0; i < randomNums.length / 10; i++) {
        jobSkills.push(skills[randomNums[i]]._id);
        //console.log("job skills");
        //console.log(jobSkills);
      }
      job.skills = jobSkills;
    });
    await Job.deleteMany({});
    await Job.create(jobSeeds);

    await Reaction.deleteMany({});
    await Reaction.create(reactionSeeds);
    console.log("****REACTIONS SEEDED****");

    await Group.deleteMany({});
    await Group.create(groupSeeds);
    console.log("****GROUPS SEEDED****");

    await Post.deleteMany({});
    const entities = await Entity.find({});
    console.log(entities);
    const randomNumsPosts = Array.from({ length: entities.length }, () =>
      Math.floor(Math.random() * entities.length)
    );
    console.log(randomNumsPosts);
    console.log(entities);
    let k = 0;
    postSeeds.map((post) => {
      post.entity = entities[randomNumsPosts[k]]._id;
      k = k + 1;
    });
    console.log("107 post seeds", postSeeds);
    await Post.create(postSeeds);
    console.log("****POSTS SEEDED****");

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

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
