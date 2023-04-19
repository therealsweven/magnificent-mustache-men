const { AuthenticationError } = require("apollo-server-express");
//const { Entity, User, School, Company, Job, Post, Group, Reaction, Skill } =
//  require("../models").default;
const { Entity } = require("../models");
const { User } = require("../models");
const { School } = require("../models");
const { Company } = require("../models");
const { Job } = require("../models");
const { Group } = require("../models");
const { Reaction } = require("../models");
const { Skill } = require("../models");

const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId }).populate([
        "skills",
        "groups",
        "connections",
        "education",
        "experience",
      ]);
    },
    companies: async () => {
      return Company.find();
    },
    company: async (parent, { companyId }) => {
      return Company.find({ _id: companyId });
    },
    schools: async () => {
      return School.find();
    },
    school: async (parent, { schoolId }) => {
      return School.find({ _id: schoolId });
    },
  },

  Mutation: {
    // create a new user
    createUser: async (parent, userInput) => {
      const user = await User.create(userInput);
      await Entity.create({ user: user._id });
      return user;
    },
    // create a new school
    createSchool: async (parent, schoolInput) => {
      schoolInput.admins = [context.user._id];
      const school = await School.create(schoolInput);
      await Entity.create({ school: school._id });
      return school;
    },
    // create new company
    createCompany: async (parent, companyInput, context) => {
      companyInput.admins = [context.user._id];
      const company = await Company.create(companyInput);
      await Entity.create({ company: company._id });
      return company;
    },
    // create new group
    createGroup: async (parent, groupInput, context) => {
      groupInput.admins = [context.user._id];
      groupInput.members = [context.user._id];
      const group = await Group.create(groupInput);
      return group;
    },
    // create new skill
    createSkill: async (parent, skillName) => {
      return await Skill.create(skillName);
    },
    // create new group
    createGroup: async (parent, groupInput) => {
      const group = await Company.create(groupInput);
      return group;
    },
    //login user
    userLogin: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError(
          "No user account with that information found!"
        );
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
