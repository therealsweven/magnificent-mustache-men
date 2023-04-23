const { AuthenticationError } = require("apollo-server-express");
const { Entity } = require("../models");
const { User, Experience, Education } = require("../models/User");
const { School } = require("../models");
const {
  Post,
  Comment,
  PostReaction,
  CommentReaction,
} = require("../models/Post");
const { Company, Location } = require("../models");
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
    feedTest: async (parent, args, context) => {
      console.log("Line 88", args.entityId);
      const entity = await Entity.findOne({
        _id: args.entityId,
      }).populate("user");
      console.log("Line91", "entity", entity);

      const user = await User.findOne({ _id: entity.user });
      console.log("user", user.entitiesFollowed);
      const entities = user.entitiesFollowed;

      console.log("Line 98", "entities", entities);

      const posts = await Post.find({ entity: { $in: entities } }).populate(
        "entity",
        "user"
      );
      console.log(posts);
      const sortedPosts = posts.sort(function (a, b) {
        let x = a.updatedAt;
        let y = b.updatedAt;

        if (x > y) {
          return -1;
        }
        if (x < y) {
          return 1;
        }
        return 0;
      });
      return sortedPosts;
    },
    feed: async (parent, args, context) => {
      console.log("Line 88", context.activeProfile.entity);
      const entity = await Entity.findOne({
        _id: context.activeProfile.entity,
      }).populate("user");
      console.log("Line91", "entity", entity);

      const user = await User.findOne({ _id: entity.user });
      console.log("user", user.entitiesFollowed);
      const entities = user.entitiesFollowed;

      console.log("Line 98", "entities", entities);

      const posts = await Post.find({ entity: { $in: entities } }).populate(
        "entity",
        "user"
      );
      console.log(posts);
      const sortedPosts = posts.sort(function (a, b) {
        let x = a.updatedAt;
        let y = b.updatedAt;

        if (x > y) {
          return -1;
        }
        if (x < y) {
          return 1;
        }
        return 0;
      });
      console.log("sorted posts", sortedPosts);
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
    // search: async (_, { query }, { dataSources }) => {
    //   const jobs = await dataSources.productAPI.searchJobs(query);

    //   return { jobs };
    // },
  },

  Mutation: {
    // create a new user    - good
    createUser: async (parent, userInput) => {
      const user = await User.create(userInput);
      await Entity.create({ user: user._id });
      return user;
    },
    // create a new school    - good
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
    // create new company
    createLocation: async (parent, args, context) => {
      console.log("hello");
      const entity = Entity.findOne({ _id: context.activeProfile.entity });
      const location = await Location.create(args);
      return await Company.findOneAndUpdate(
        { _id: entity.company },
        { $push: { locations: location._id } }
      );
    },
    // create new group       - good
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
    // create new work experience
    createExperience: async (parent, args, context) => {
      console.log(args);
      const experience = await Experience.create(args);
      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $push: { experience: experience._id } }
      );
    },
    createExperienceTest: async (parent, args, context) => {
      const experience = await Experience.create({
        company: args.company,
        title: args.title,
        jobDescription: args.jobDescription,
        startMonth: args.startMonth,
        startYear: args.startYear,
        current: args.current,
        endMonth: args.endMonth,
        endYear: args.endYear,
      });
      return await User.findOneAndUpdate(
        { _id: args.userId },
        { $push: { experience: experience._id } }
      );
    },
    // create new education record
    createEducation: async (parent, args, context) => {
      const education = await Education.create(args);
      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $push: { education: education._id } }
      );
    },
    // create new education record
    // createEducationTest: async (parent, args, context) => {
    //   const education = await Education.create(args);
    //   return await User.findOneAndUpdate(
    //     { _id: args.userId },
    //     { $push: { education: education._id } }
    //   );
    // },
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
    // create new post - good
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
    // create new comment - good
    createComment: async (parent, args, context) => {
      console.log(args);
      const comment = await Comment.create({
        entity: context.activeProfile.entity,
        commentBody: args.commentBody,
      });
      return await Post.findOneAndUpdate(
        { _id: args.postId },
        { $push: { comments: comment._id } },
        { new: true }
      ).populate("comments");
    },
    // create post reaction
    createPostReaction: async (parent, args, context) => {
      args.entity = context.activeProfile.entity;
      const postReaction = PostReaction.create(args);
      const post = await Post.findOneAndUpdate(
        { _id: args.postId },
        {
          reactions: {
            $push: postReaction._id,
          },
        }
      );
      return post;
    },
    // create post reaction
    createCommentReaction: async (parent, args, context) => {
      args.entity = context.activeProfile.entity;
      const commentReaction = CommentReaction.create(args);
      const comment = await Comment.findOneAndUpdate(
        { _id: args.postId },
        {
          reactions: {
            $push: commentReaction._id,
          },
        }
      );
      return comment;
    },
    //create add friend
    addConnection: async (parent, args, context) => {
      if (context.user._id) {
        //find entities for user and user being added
        const eUser = await Entity.findOne({ user: context.user._id }).populate(
          "user"
        );
        const eConnect = await Entity.findOne({
          user: args.connectionId,
        }).populate("user");
        // add to entities followed
        await User.findOneAndUpdate(
          { _id: args.connectionId },
          { $push: { entitiesFollowed: eUser._id } }
        );
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { entitiesFollowed: eConnect._id } }
        );
        // add to connections
        await User.findOneAndUpdate(
          { _id: args.connectionId },
          { $push: { connections: context.user._id } }
        );
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $push: {
              connections: args.connectionId,
            },
          },
          {
            new: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in");
    },
    //  follow a school or company need schoolId or companyId
    followEntity: async (parent, args, context) => {
      console.log(args);
      if (context.user) {
        // is it school or company
        const id = args.schoolId || args.companyId;
        let entity = {};
        // for company
        if (args.companyId) {
          entity = await Entity.findOne({ company: id });
          console.log(entity);
          await Company.findOneAndUpdate(
            { _id: id },
            { $addToSet: { followers: context.activeProfile.entity } }
          );
          // for school
        } else if (args.schoolId) {
          entity = await Entity.findOne({ school: id });
          await School.findOneAndUpdate(
            { _id: id },
            { $addToSet: { followers: context.activeProfile.entity } }
          );
        }
        // add to user array
        if (context.activeProfile.type === "user") {
          const e = await Entity.findOne({ _id: context.activeProfile.entity });
          await User.findOneAndUpdate(
            { _id: e.user },
            {
              $addToSet: {
                entitiesFollowed: entity._id,
              },
            },
            {
              new: true,
            }
          );
          return await Entity.findOne({
            _id: context.activeProfile.entity,
          }).populate("user");
          // add to school array
        } else if (context.activeProfile.type === "school") {
          const e = await Entity.findOne({ _id: context.activeProfile.entity });
          await School.findOneAndUpdate(
            { _id: e.school },
            {
              $addToSet: {
                entitiesFollowed: entity._id,
              },
            },
            {
              new: true,
            }
          );
          return await Entity.findOne({
            _id: context.activeProfile.entity,
          }).populate("school");
          //add to company array
        } else if (context.activeProfile.type === "company") {
          const e = await Entity.findOne({ _id: context.activeProfile.entity });
          await Company.findOneAndUpdate(
            { _id: e.company },
            {
              $addToSet: {
                entitiesFollowed: entity._id,
              },
            },
            {
              new: true,
            }
          );
          return await Entity.findOne({
            _id: context.activeProfile.entity,
          }).populate("company");
        }
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

      const entity = await Entity.findOne({ user: userData._id });
      console.log(entity);
      const token = signToken(userData);
      return { token, userData, entity };
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
        const user = await User.findOne({ _id: context.user._id });
        await Post.deleteMany({ entity: context.activeProfile.entity });
        await Comment.deleteMany({ entity: context.activeProfile.entity });
        await PostReaction.deleteMany({ entity: context.activeProfile.entity });
        await CommentReaction.deleteMany({
          entity: context.activeProfile.entity,
        });
        await User.findOneAndDelete({ _id: context.user._id });
        return;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeGroup: async (parent, args, context) => {
      return await Group.findOneAndDelete({ _id: args.groupId });
    },
    removeCompany: async (parent, args, context) => {
      await Entity.findOneAndDelete({ company: args.companyId });
      return await Company.findOneAndDelete({ _id: args.companyId });
    },
    removeJob: async (parent, args, context) => {
      return await Job.findOneAndDelete({ _id: args.jobId });
    },
    removeSchool: async (parent, args, context) => {
      await Entity.findOneAndDelete({ company: args.schoolId });
      return await School.findOneAndDelete({ _id: args.schoolId });
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
    //remove skill from user
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
    applyToJob: async (parent, args, context) => {
      return await Job.findOneAndUpdate(
        { _id: args.jobId },
        {
          $push: { applicants: context.user._id },
        },
        {
          new: true,
        }
      ).populate("applicants");
    },
    applyToJobTest: async (parent, args, context) => {
      return await Job.findOneAndUpdate(
        { _id: args.jobId },
        {
          $push: { applicants: args.userId },
        },
        {
          new: true,
        }
      ).populate("applicants");
    },
  },
};

module.exports = resolvers;
