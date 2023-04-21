const { AuthenticationError } = require("apollo-server-express");
//const { Entity, User, School, Company, Job, Post, Group, Reaction, Skill } =
//  require("../models").default;
const { Entity } = require("../models");
const { User } = require("../models");
const { School } = require("../models");
const { Post, Comment } = require("../models/Post");
const { Company } = require("../models");
const { Job } = require("../models");
const { Group } = require("../models");
const { Reaction } = require("../models");
const { Skill } = require("../models");

const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    skills: async () => {
      return await Skill.find();
    },
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
        "posts",
      ]);
    },
    me: async (parent, args, context) => {
      return await User.findOne({ _id: context.user._id }).populate([
        "skills",
        "groups",
        "connections",
        "education",
        "experience",
        "posts",
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
      const entities = [];
      if (context.activeProfile.type === "user") {
        const user = await User.findOne({
          entityId: context.activeProfile.entity,
        }).populate("entitiesFollowed");
        entities = user.entitiesFollowed;

        // company
      } else if (context.activeProfile.type === "company") {
        const company = await Company.findOne({
          entityId: context.activeProfile.entity,
        }).populate("entitiesFollowed");
        entities = company.entitiesFollowed;

        // school
      } else if (context.activeProfile.type === "school") {
        const school = await School.findOne({
          entityId: context.activeProfile.entity,
        }).populate("entitiesFollowed");
        entities = school.entitiesFollowed;
      }
      const posts = await Post.find({ entity: { $in: entities } }).populate(
        "reactions",
        "comments"
      );

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
    feedTest: async (parent, args, context) => {
      //user
      const entities = [];
      if (args.type === "user") {
        const user = await User.findOne({
          entityId: args.entity,
        }).populate("entitiesFollowed");
        entities = user.entitiesFollowed;

        // company
      } else if (args.type === "company") {
        const company = await Company.findOne({
          entityId: args.entity,
        }).populate("entitiesFollowed");
        entities = company.entitiesFollowed;

        // school
      } else if (args.type === "school") {
        const school = await School.findOne({
          entityId: args.entity,
        }).populate("entitiesFollowed");
        entities = school.entitiesFollowed;
      }
      const posts = await Post.find({ entity: { $in: entities } }).populate(
        "reactions",
        "comments"
      );

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
      const companies = await Company.find({
        admins: { $in: context.user._id },
      });
      const schools = await School.find({ admins: { $in: context.user._id } });
      const userProfs = await Entity.find({ user: user._id }).populate("user");
      const companyIds = companies.map((company) => company._id);
      const companyProfs = await Entity.find({
        company: { $in: companyIds },
      }).populate("company");
      const schoolIds = schools.map((school) => school._id);
      const schoolProfs = await Entity.find({
        school: { $in: schoolIds },
      }).populate("school");
      const profs = userProfs.concat(companyProfs).concat(schoolProfs);

      return profs;
    },
    // profilesByUser: async (parent, { userId }) => {
    //   const user = await User.findOne({ _id: userId });
    //   const companies = await Company.find({ admins: { $in: userId } });
    //   const schools = await School.find({ admins: { $in: userId } });
    //   const userProfs = await Entity.find({ user: user._id }).populate("user");
    //   const companyIds = companies.map((company) => company._id);
    //   const companyProfs = await Entity.find({
    //     company: { $in: companyIds },
    //   }).populate("company");
    //   const schoolIds = schools.map((school) => school._id);
    //   const schoolProfs = await Entity.find({
    //     school: { $in: schoolIds },
    //   }).populate("school");
    //   const profs = userProfs.concat(companyProfs).concat(schoolProfs);

    //   return profs;
    // },
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
    createSchool: async (parent, schoolInput, context) => {
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
      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $push: { groups: group._id } }
      );
      return group;
    },
    // create new skill in skills collection
    createSkill: async (parent, skillName) => {
      return await Skill.create(skillName);
    },
    // add skill to user
    addSkill: async (parent, args, context) => {
      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $push: { skills: args.skillId } }
      );
    },
    // create new job
    createJob: async (parent, jobInput, context) => {
      const entity = await Entity.findOne({
        _id: context.activeProfile.entity,
      });
      jobInput.company = entity.company;
      const job = await Job.create(jobInput);
      await Company.findOneAndUpdate(
        { _id: entity.company },
        { $push: { jobs: job._id } }
      );
      return job;
    },
    // create new post
    createPost: async (parent, postInput, context) => {
      postInput.user = context.user._id;
      postInput.entity = context.activeProfile.entity;
      const post = await Post.create(postInput);

      const entity = await Entity.findOne({ _id: post.entity });
      // add post to user, company, or school that posted it for querying later
      if (entity.user) {
        await User.findOneAndUpdate(
          { _id: entity.user },
          { $push: { posts: post._id } }
        );
      } else if (entity.school) {
        await School.findOneAndUpdate(
          { _id: entity.school },
          { $push: { posts: post._id } }
        );
      } else if (entity.company) {
        await Company.findOneAndUpdate(
          { _id: entity.company },
          { $push: { posts: post._id } }
        );
      }

      return post;
    },
    // create new comment
    createComment: async (parent, args, context) => {
      args.entity = context.activeProfile.entity;
      const comment = await Comment.create(args);
      await Post.findOneAndUpdate(
        { _id: args.postId },
        { $push: { comments: comment._id } }
      );
    },
    // create post reaction
    createPostReaction: async (parent, args, context) => {
      const postReaction = await Post.findOneAndUpdate(
        { _id: args.postId },
        {
          reactions: {
            $push: {
              entity: context.activeProfile.entity,
              reactionId: args.reactionId,
            },
          },
        }
      );
      return postReaction;
    },
    //create add friend
    addConnection: async (parent, args, context) => {
      if (context.user._id) {
        await User.findOneAndUpdate(
          { _id: friendId },
          { $push: { connections: args._id } }
        );
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $push: {
              connections: context.user._id,
            },
          },
          {
            new: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in");
    },
    //  create followEntity need entityId
    followEntity: async (parent, args, context) => {
      if (context.user) {
        //add entity to user entitiesFollowed
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $push: {
              entitiesFollowed: args.entityId,
            },
          },
          {
            new: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in");
    },
    // joinGroup need groupId
    joinGroup: async (parent, args, context) => {
      if (context.user) {
        //add to group
        await Group.findOneAndUpdate(
          { _id: args.groupId },
          {
            $push: {
              members: context.user._id,
            },
          },
          {
            new: true,
          }
        );
        // add group to user groups array
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $push: {
              groups: args.groupId,
            },
          }
        );
      }
      throw new AuthenticationError("You need to be logged in");
    },
    //login need email and password
    userLogin: async (parent, { email, password }) => {
      const userData = await User.findOne({ email });

      if (!userData) {
        throw new AuthenticationError(
          "No user account with that information found!"
        );
      }

      const correctPw = await userData.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }
      const entity = await Entity.find({ user: { $eq: userData._id } });
      const entityId = entity[0]._id;
      const token = signToken(userData);
      return { token, userData, entityId };
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
    removeSkill: async (parent, { skillId, userId }, context) => {
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
    removeEntity: async (parent, { userId, entityId }, context) => {
      if (context.user) {
        const entity = await Entity.findOneAndDelete({
          _id: entityId,
          entityAuthor: context.user._id,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { entities: entity._id } }
        );

        return entity;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeConnection: async (parent, args, context) => {
      if (context.user) {
        await User.findOneAndUpdate(
          { _id: args.connectionId },
          {
            $pull: {
              connections: context.user._id,
            },
          }
        );
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: {
              connections: args.connectionId,
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in");
    },
    unfollowEntity: async (parent, entityId, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: {
              entitiesFolled: context.user._id,
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    leaveGroup: async (parent, { userId, groupId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId },
          {
            $pull: {
              groups: {
                _id: groupId,
                groupCreator: context.user._id,
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
