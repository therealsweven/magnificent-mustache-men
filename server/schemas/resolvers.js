const { AuthenticationError } = require("apollo-server-express");
const {
  User,
  Post,
  Comment,
  Reaction,
  Company,
  Job,
  EducationalInstitution,
  Group,
  Skill,
} = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
  },
};

module.exports = resolvers;
