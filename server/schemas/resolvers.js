const { AuthenticationError } = require("apollo-server-express");
//const { Entity, User, School, Company, Job, Post, Group, Reaction, Skill } =
//  require("../models").default;
const { Entity } = require("../models");
const { User } = require("../models");
const { School } = require("../models");
const { Post } = require("../models");
const { Company } = require("../models");
const { Job } = require("../models");
const { Group } = require("../models");
const { Reaction } = require("../models");
const { Skill } = require("../models");

const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },
    user: async (parent, { userId }) => {
      return await User.findOne({ _id: userId }).populate([
        "skills",
        "groups",
        "connections",
        "education",
        "experience",
      ]);
    },
    me: async (parent, args, context) => {
      return await User.findOne({ _id: context.user._id }).populate([
        "skills",
        "groups",
        "connections",
        "education",
        "experience",
      ]);
    },
    companies: async () => {
      return await Company.find();
    },
    company: async (parent, { companyId }) => {
      return await Company.findOne({ _id: companyId }).populate([
        "locations",
        "jobs",
        "entitiesFollowed",
        "posts",
      ]);
    },
    schools: async () => {
      return await School.find();
    },
    school: async (parent, { schoolId }) => {
      return await School.findOne({ _id: schoolId }).populate([
        "name",
        "city",
        "state",
        "bio",
        "website",
        "profPic",
        "posts",
      ]);
    },
    jobs: async () => {
      return await Job.find();
    },
    job: async (parent, { jobId }) => {
      return await Job.findOne({ _id: jobId }).populate([
        "company",
        "skills",
        "title",
        "qualifications",
        "salary",
        "responsibilities",
        "benefits",
        "schedule",
      ]);
    },
    feed: async (parent, args, context) => {
      //user
      if (context.activeProfile.type === "user") {
        const user = await User.findOne({
          entityId: context.activeProfile.entity,
        }).populate("entitiesFollowed");
        const entities = user.entitiesFollowed;

        // company
      } else if (context.activeProfile.type === "company") {
        const company = await Company.findOne({
          entityId: context.activeProfile.entity,
        }).populate("entitiesFollowed");
        const entities = company.entitiesFollowed;

        // school
      } else if (context.activeProfile.type === "school") {
        const school = await School.findOne({
          entityId: context.activeProfile.entity,
        }).populate("entitiesFollowed");
        const entities = school.entitiesFollowed;
      }
      const posts = await Post.find({ entity: entities });
      const sortedPosts = posts.sort(function (a, b) {
        let x = a.updatedAt;
        let y = b.updatedAt;

        if (x > y) {
          return 1;
        }
        if (x < y) {
          return -1;
        }
        return 0;
      });
      return sortedPosts;
    },
    profiles: async (parent, args, context) => {
      const user = await User.findOne({ _id: context.user._id });
      const companies = await Company.find({ admins: context.user._id });
      const schools = await School.find({ admins: context.user._id });
      return { user, companies, schools };
    },
    post: async (parent, { postId }) => {
      return await Post.findOne({ _id: postId }).populate([
        "comments",
        "postBody",
        "entity",
        "reactions",
      ]);
    },
    groups: async () => {
      return await Group.find();
    },
    group: async (parent, { groupId }) => {
      return await Group.findOne({ _id: groupId }).populate([
        "name",
        "admins",
        "members",
        "posts",
        "profilePic",
      ]);
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
      const group = await Group.create(groupInput);
      return group;
    },
    // create new job
    createJob: async (parent, jobInput) => {
      const job = await Job.create(jobInput);
      return job;
    },
    // create new post
    createPost: async (parent, { postInput }, context) => {
      postInput.entity = context.activeProfile.entity;

      const post = await Post.create(postInput);
      return post;
    },
    // create post reaction
    // createPostReaction: async (parent, reactionInput)=>{
    //   Post.

    // };
    // creat comment

    // create comment reaction

    // // create experience
    // createExperience: async (parent, expInput) => {
    //   const experience = await Experience.create(expInput);
    //   return experience;
    // },
    // // create education
    // createEducation: async (parent, educationInput) => {
    //   const education = await Education.create(educationInput);
    //   return education;
    // },
    // // create location
    // createLocation: async (parent, locationInput) => {
    //   const location = await Location.create(locationInput);
    //   return location;
    // },
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
    updateUser: async (parent, { id, userInput }) => {
      return await User.findOneAndUpdate(
        { _id: id },
        { userInput },
        { new: true }
      );
    },
    updateCompany: async (parent, { id, companyInput }) => {
      return await Company.findOneAndUpdate(
        { _id: id },
        { companyInput },
        { new: true }
      );
    },
    // updateLocation: async (parent, {}) => {},
    updateSchool: async (parent, { id, schoolInput }) => {
      return await School.findOneAndUpdate(
        { _id: id },
        { schoolInput },
        { new: true }
      );
    },
    updatePost: async (parent, { id, postInput }) => {
      return await Post.findOneAndUpdate(
        { _id: id },
        { postInput },
        { new: true }
      );
    },
    // updateCommentReaction: async (parent, {}) => {},
    // updateComment: async (parent, {}) => {},
    // updatePostReaction: async (parent, {}) => {},
    updateGroup: async (parent, { id, groupInput }) => {
      return await Group.findOneAndUpdate(
        { _id: id },
        { groupInput },
        { new: true }
      );
    },
    updateJob: async (parent, { id, jobInput }) => {
      return await Job.findOneAndUpdate(
        { _id: id },
        { jobInput },
        { new: true }
      );
    },
    updateExperience: async (parent, {}) => {},
    updateEducation: async (parent, {}) => {},
  },
};

module.exports = resolvers;
