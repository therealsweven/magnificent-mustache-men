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
    createPostReaction: async (parent, { postReactionInput }, context) => {
      postReactionInput.entity = context.activeProfile.entity;

      const postReaction = await Post.create(postReacionInput);
      return postReaction;
    },
    //create add friend
    addFriend: async (parent, { userId, friendId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: {
              friends: { friendId, friendAuthor: context.user._id },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in");
    },
    //  create followEntity
    followEntity: async (parent, { userId, entityId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: {
              entitiesFollowed: { entityId, entityCreator: context.user._id },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in");
    },
    // joinGroup
    joinGroup: async (parent, { userid, groupId }, context) => {
      if (context.user) {
        return Group.findOneAndUpdate(
          { _id: groupId },
          {
            $addToSet: {
              members: { userId, memberAuthor: context.user._id },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in");
    },

    // create comment
    createComment: async (parent, { commentInput }, context) => {
      commentInput.entity = context.activeProfile.entity;

      const comment = await Post.create(commentInput);
      return comment;
    },

    // create comment reaction

    // createCommentReaction: async (
    //   parent,
    //   { commentReactionInput },
    //   context
    // ) => {
    //   commentReactionInput.entity = context.activeProfile.entity;

    //   const commentReaction = await Post.create(commentReactionInput);
    //   return commentReaction;
    // },

    // // create experience

    // createExperience: async (parent, expInput) => {
    //   const experience = await User.create(expInput);
    //   return experience;
    // },
    // // create education
    // createEducation: async (parent, educationInput) => {
    //   const education = await User.create(educationInput);
    //   return education;
    // },
    // // create location
    // createLocation: async (parent, locationInput) => {
    //   const location = await Company.create(locationInput);
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
    //update user
    updateUser: async (parent, { id, userInput }) => {
      return await User.findOneAndUpdate(
        { _id: id },
        { userInput },
        { new: true }
      );
    },
    //update company
    updateCompany: async (parent, { id, companyInput }) => {
      return await Company.findOneAndUpdate(
        { _id: id },
        { companyInput },
        { new: true }
      );
    },
    // update school
    updateSchool: async (parent, { id, schoolInput }) => {
      return await School.findOneAndUpdate(
        { _id: id },
        { schoolInput },
        { new: true }
      );
    },
    // update post
    updatePost: async (parent, { id, postInput }) => {
      return await Post.findOneAndUpdate(
        { _id: id },
        { postInput },
        { new: true }
      );
    },
    // update comment reaction
    updateCommentReaction: async (parent, { comReactionId, reactionInput }) => {
      return await Post.findOneAndUpdate(
        { _id: comReactionId },
        { reactionInput },
        { new: true }
      );
    },
    // update comment
    updateComment: async (parent, { commentId, commentInput }) => {
      return await Post.findOneAndUpdate(
        { _id: commentId },
        { commentInput },
        { new: true }
      );
    },
    // update post reaction
    updatePostReaction: async (parent, { postReactionId, reactionInput }) => {
      return await Post.findOneAndUpdate(
        { _id: postReactionId },
        { reactionInput },
        { new: true }
      );
    },
    // update group
    updateGroup: async (parent, { id, groupInput }) => {
      return await Group.findOneAndUpdate(
        { _id: id },
        { groupInput },
        { new: true }
      );
    },
    // update job listing
    updateJob: async (parent, { id, jobInput }) => {
      return await Job.findOneAndUpdate(
        { _id: id },
        { jobInput },
        { new: true }
      );
    },
    // update company location
    updateLocation: async (parent, { id, locatinInput }) => {
      return await Company.findOneAndUpdate(
        { _id: id },
        { locationInput },
        { new: true }
      );
    },
    // update user work experience
    updateExperience: async (parent, { id, experienceInput }) => {
      return await User.findOneAndUpdate(
        { _id: id },
        { experienceInput },
        { new: true }
      );
    },
    // update user education info
    updateEducation: async (parent, { id, educationInput }) => {
      return await User.findOneAndUpdate(
        { _id: id },
        { educationInput },
        { new: true }
      );
    },
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
    removeLocation: async (parent, { locationId }, context) => {
      if (context.user) {
        const location = await Company.findOneAndDelete({
          _id: locationId,
          locationCreator: context.company._id,
        });

        await Company.findOneAndUpdate(
          { _id: context.company._id },
          { $pull: { locations: location._id } }
        );
        return location;
      }
      throw new AuthenticationError("You need to be logged in");
    },
    removeEducation: async (parent, { educationId }, context) => {
      if (context.user) {
        const education = await User.findOneAndDelete({
          _id: educationId,
          educationCreator: context.user._id,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { educations: education._id } }
        );
        return education;
      }
      throw new AuthenticationError("You need to be logged in");
    },
    removeExperience: async (parent, { experienceId }, context) => {
      if (context.user) {
        const experience = await User.findOneAndDelete({
          _id: experienceId,
          experienceCreator: context.user._id,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { experiences: experience._id } }
        );
        return experience;
      }
      throw new AuthenticationError("You need to be logged in");
    },
  },
};

module.exports = resolvers;
