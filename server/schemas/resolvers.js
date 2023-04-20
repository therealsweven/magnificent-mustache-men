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
      const profs = [await Entity.find({ user: user._id })].populate("user");
      profs
        .push(await Entity.find({ companies: { $in: companies } }))
        .populate("company");
      profs
        .push(await Entity.find({ school: { $in: schools } }))
        .populate("school");
      return { profs };
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
    removeUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeGroup: async (parent, args, context) => {
      if (context.user) {
        return Group.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("Only an Admin can remove a group!");
    },
    removeCompany: async (parent, args, context) => {
      if (context.user) {
        return Company.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("Only an Admin can remove a Company");
    },
    removeJob: async (parent, args, context) => {
      if (context.user) {
        return Job.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("Only a Company can remove a Job");
    },
    removeSchool: async (parent, args, context) => {
      if (context.user) {
        return School.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("Only and admin can remove a School");
    },
    removeReaction: async (parent, { reactionId }, context) => {
      if (context.user) {
        const reaction = await Reaction.findOneAndDelete({
          _id: reactionId,
          reactionAuthor: context.user._id,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { reactions: reaction._id } }
        );
        return reaction;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removePostReaction: async (parent, { postId, reactionId }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $pull: {
              reactions: {
                _id: reactionId,
                reactionAuthor: context.user._id,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationErrror("You need to be logged in!");
    },
    removeComment: async (parent, { postId, commentId }, context) => {
      if (context.user) {
        return Post.findOneAndDelete(
          { _id: postId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user._id,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // removeCommentReaction: async (
    //   parent,
    //   { postId, commentId, reactionId },
    //   context
    // ) => {},
    removePost: async (parent, { postId }, context) => {
      if (context.user) {
        const post = await Post.findOneAndDelete({
          _id: postId,
          postAuthor: context.user._id,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { posts: post._id } }
        );
        return post;
      }
      throw new AuthenticationError("You need to be logged in");
    },
    removeSkill: async (parent, { skill, userId }, context) => {
      if (context.user) {
        return Skill.findOneAndUpdate(
          { _id: userId },
          {
            $pull: {
              skills: {
                _id: skillId,
                skillCreator: context.user._id,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in");
    },
    // removeEntity: async (parent, args, context) => {},
    removeFriend: async (parent, { userId, friendId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId },
          {
            $pull: {
              friends: {
                _id: friendId,
                friendCreator: context.user._id,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in");
    },
    unfollowEntity: async (parent, { entityId, userId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId },
          {
            $pull: {
              entities: {
                _id: entityId,
                entityCreator: context.user._id,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
