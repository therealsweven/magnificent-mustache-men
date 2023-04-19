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
    // users: async () => {
    //   return User.find();
    // },
    // user: async (parent, { userId }) => {
    //   return User.find({ _id: userId });
    // },
  },

  Mutation: {
    // create a new user
    createUser: async (userInput) => {
      const user = await User.create(parent, userInput);
      await Entity.create({ user: user._id });
      return user;
    },
    // create a new school
    createSchool: async (schoolInput) => {
      const school = await School.create(parent, schoolInput);
      await Entity.create({ school: school._id });
      return school;
    },
    createCompany: async (companyInput) => {
      const company = await Company.create(parent, companyInput);
      await Entity.create({ company: company._id });
      return company;
    },
  },
};

module.exports = resolvers;
