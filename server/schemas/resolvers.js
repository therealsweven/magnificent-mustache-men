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
        {
        path: "education",
        populate: "school"
        },
        {
        path: "experience",
        populate: "company"
        
        },
        "posts",
        {
          path: "entitiesFollowed",
          populate: [{ path: "user" }, { path: "company" }, { path: "school" }],
          
        },
      ]);
    },
    me: async (parent, args, context) => {
      return await User.findOne({ _id: context.user._id }).populate([
        "skills",
        "groups",
        "connections",
        { path: "education", populate: { path: "school" } },
        {
          path: "experience",
          populate: { path: "company" },
        },
        {
          path: "posts",
          populate: [
            {
              path: "comments",
              match: { commentBody: { $ne: null } }, // exclude comments with null commentBody
            },
            {
              path: "entity",
              populate: [
                { path: "user" },
                { path: "company" },
                { path: "school" },
              ],
            },
          ],
        },
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
      return await School.find().sort({ name: "asc" });
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
      // console.log("Line 88", args.entityId);
      const entity = await Entity.findOne({
        _id: args.entityId,
      }).populate("user");
      // console.log("Line91", "entity", entity);

      const user = await User.findOne({ _id: entity.user });
      // console.log("user", user.entitiesFollowed);
      const entities = user.entitiesFollowed;

      // console.log("Line 98", "entities", entities);

      const posts = await Post.find({ entity: { $in: entities } }).populate(
        "entity",
        "user"
      );
      // console.log(posts);
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
      //console.log("Line 88", context.activeProfile.entity);
      const entity = await Entity.findOne({
        _id: context.activeProfile.entity,
      });
      //console.log("Line140", "entity", entity.company);
      let entities = [];
      if (entity.user !== undefined) {
        const user = await User.findOne({ _id: entity.user });
        //console.log("user", user.entitiesFollowed);
        user.entitiesFollowed.map((entity) => {
          entities.push(entity);
        });
      }
      if (entity.company !== undefined) {
        // console.log("hello");
        const company = await Company.findOne({ _id: entity.company });
        //console.log("company", company.entitiesFollowed);
        company.entitiesFollowed.map((entity) => {
          entities.push(entity);
        });
      }
      if (entity.school !== undefined) {
        const school = await School.findOne({ _id: entity.school });
        //console.log("school", school.entitiesFollowed);
        school.entitiesFollowed.map((entity) => {
          entities.push(entity);
        });
      }
      // console.log("Line 161", "entities", entities);

      const posts = await Post.find({ entity: { $in: entities } }).populate([
        {
          path: "reactions",
          populate: [
            {
              path: "reactionId",
              populate: [
                { path: "_id" },
                { path: "icon" },
                { path: "reactionName" },
              ],
            },
          ],
        },
        {
          path: "entity",
          populate: [{ path: "user" }, { path: "company" }, { path: "school" }],
        },
        {
          path: "comments",
          populate: [
            { path: "commentBody" },
            {
              path: "entity",
              populate: [
                { path: "user" },
                { path: "company" },
                { path: "school" },
              ],
            },
          ],
        },
      ]);
      // console.log(posts);
      const userPosts = await Post.find({
        entity: { $eq: context.activeProfile.entity },
      }).populate([
        {
          path: "entity",
          populate: [{ path: "user" }, { path: "company" }, { path: "school" }],
        },
        {
          path: "comments",
          populate: [
            { path: "commentBody" },
            {
              path: "entity",
              populate: [
                { path: "user" },
                { path: "company" },
                { path: "school" },
              ],
            },
          ],
        },
      ]);
      // console.log("userPosts", userPosts);

      userPosts.forEach((post) => {
        posts.push(post);
      });

      //console.log(posts);
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
      //console.log("sorted posts", sortedPosts);
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
    reactions: async (parent, args, context) => {
      return await Reaction.find();
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
      //console.log(postId);
      const post = await Post.findOne({ _id: postId }).populate([
        {
          path: "reactions",
          populate: [
            {
              path: "reactionId",
              populate: [
                { path: "_id" },
                { path: "icon" },
                { path: "reactionName" },
              ],
            },
          ],
        },
      ]);
      return post;
    },
    comment: async (parent, { commentId }) => {
      console.log(commentId);
      const comment = await Comment.findOne({ _id: commentId }).populate([
        {
          path: "reactions",
          populate: [
            {
              path: "reactionId",
              populate: [
                { path: "_id" },
                { path: "icon" },
                { path: "reactionName" },
              ],
            },
          ],
        },
      ]);
      console.log(comment);
      return comment;
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
      if (!userInput.profPic) {
        userInput.profPic =
          "https://png.pngtree.com/png-vector/20190221/ourlarge/pngtree-female-user-vector-avatar-icon-png-image_691506.jpg";
      }
      const user = await User.create(userInput);
      await Entity.create({ user: user._id });
      return user;
    },
    // create a new school    - good
    createSchool: async (parent, schoolInput, context) => {
      if (!schoolInput.profPic) {
        schoolInput.profPic =
          "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
      }
      schoolInput.admins = [context.user._id];
      const school = await School.create(schoolInput);
      await Entity.create({ school: school._id });
      return school;
    },
    // create new company
    createCompany: async (parent, companyInput, context) => {
      if (!companyInput.profPic) {
        companyInput.profPic =
          "https://images.unsplash.com/photo-1577071835592-d5d55ffef660?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
      }
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
      if (!groupInput.profPic) {
        groupInput.profPic =
          "https://images.unsplash.com/photo-1455734729978-db1ae4f687fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
      }
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
      console.log(args);
      const skill = await Skill.findOne({ skillName: args.skillName });
      console.log(skill);
      if (skill) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { skills: skill._id } }
        );
      }
      if (skill === null) {
        const newSkill = Skill.create(args);
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { skills: newSkill._id } }
        );
      }
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
      console.log("jobInput", jobInput);
      const entity = await Entity.findOne({
        _id: context.activeProfile.entity,
      });
      console.log("entity", entity);
      jobInput.company = entity.company;
      const job = await Job.create(jobInput);
      await Company.findOneAndUpdate(
        { _id: entity.company },
        { $push: { jobs: job._id } }
      );
      console.log(context);
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
      const postReaction = await PostReaction.create(args);
      console.log(postReaction);
      const post = await Post.findOneAndUpdate(
        { _id: args.postId },
        {
          $push: {
            reactions: postReaction._id,
          },
        }
      );
      return post;
    },
    // create post reaction
    createCommentReaction: async (parent, args, context) => {
      args.entity = context.activeProfile.entity;
      const commentReaction = await CommentReaction.create({
        entity: args.entity,
        reactionId: args.reactionId,
      });
      const comment = await Comment.findOneAndUpdate(
        { _id: args.commentId },
        {
          $push: {
            reactions: commentReaction._id,
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
          { $addToSet: { entitiesFollowed: eUser._id } }
        );
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { entitiesFollowed: eConnect._id } }
        );
        // add to connections
        await User.findOneAndUpdate(
          { _id: args.connectionId },
          { $addToSet: { connections: context.user._id } }
        );
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
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
      console.log("hello");
      if (context.user) {
        //add to group
        await Group.findOneAndUpdate(
          { _id: args.groupId },
          {
            $addToSet: {
              members: context.user._id,
            },
          }
        );
        // add group to user groups array
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
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
    // update user - should work
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndUpdate({ _id: context.user._id }, args, {
          new: true,
        });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateUserTest: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndUpdate({ _id: context.user._id }, args, {
          new: true,
        });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    //update company - should work
    updateCompany: async (parent, args, context) => {
      const entity = await Entity.findOne({
        company: context.activeProfile.entity,
      });
      return await Company.findOneAndUpdate({ _id: entity.company }, args, {
        new: true,
      });
    },
    // update school - should work
    updateSchool: async (parent, args, context) => {
      const entity = await Entity.findOne({
        school: context.activeProfile.entity,
      });
      return await School.findOneAndUpdate({ _id: entity.school }, args, {
        new: true,
      });
    },
    // update post - needs updating
    updatePost: async (parent, { id, postInput }) => {
      return await Post.findOneAndUpdate(
        { _id: id },
        { postInput },
        { new: true }
      );
    },
    // update comment reaction - needs updating
    updateCommentReaction: async (parent, { comReactionId, reactionInput }) => {
      return await Post.findOneAndUpdate(
        { _id: comReactionId },
        { reactionInput },
        { new: true }
      );
    },
    // update comment - needs updating
    updateComment: async (parent, { commentId, commentInput }) => {
      return await Post.findOneAndUpdate(
        { _id: commentId },
        { commentInput },
        { new: true }
      );
    },
    // update post reaction - needs updating
    updatePostReaction: async (parent, { postReactionId, reactionInput }) => {
      return await Post.findOneAndUpdate(
        { _id: postReactionId },
        { reactionInput },
        { new: true }
      );
    },
    // update group - should work
    updateGroup: async (parent, args, context) => {
      if (context.user) {
        return Group.findOneAndUpdate({ _id: context.user._id }, args, {
          new: true,
        });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // test - works
    updateGroupTest: async (parent, args, context) => {
      return await Group.findOneAndUpdate(
        { groupId: args.id },
        {
          name: args.name,
          admins: args.admins,
          private: args.private,
          members: args.members,
          posts: args.posts,
          joinQuestion: args.joinQuestion,
          profPic: args.profPic,
          bannerPic: args.bannerPic,
        },
        { new: true }
      );
    },
    // update job listing - should work
    updateJob: async (parent, args, context) => {
      if (context.user) {
        return Job.findOneAndUpdate({ _id: context.user._id }, args, {
          new: true,
        });
      }
      throw new AuthenticationError("You need to be logged in");
    },
    // update company location - should work
    updateLocation: async (parent, args, context) => {
      if (context.user) {
        return Company.findOneAndUpdate({ _id: context.user._id }, args, {
          new: true,
        });
      }
      throw new AuthenticationError("You need to be logged in");
    },
    // update user work experience - should work
    updateExperience: async (parent, args, context) => {
      console.log(args);

      // if (context.user) {
      const exp = await Experience.findOneAndUpdate(
        { _id: args.expId },
        {
          company: args.company,
          title: args.title,
          jobDescription: args.jobDescription,
          startMonth: args.startMonth,
          startYear: args.startYear,
          current: args.current,
        },
        {
          new: true,
        }
      );
      return exp;
    },
    // update user education info - should work
    updateEducation: async (parent, args, context) => {
      if (context.user) {
        return Education.findOneAndUpdate(
          { _id: args.eduId },
          {
            school: args.school,
            fieldOfStudy: args.fieldOfStudy,
            certificateType: args.certificateType,
            skills: args.skills,
            startMonth: args.startMonth,
            startYear: args.startYear,
            current: args.current,
            endMonth: args.endMonth,
            endYear: args.endYear,
          },
          {
            new: true,
          }
        );
      }
    },
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
    // tested in Apollo - working
    removeGroup: async (parent, args, context) => {
      return await Group.findOneAndDelete({ _id: args.groupId });
    },
    // tested in Apollo - working
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
    removeSkill: async (parent, skillId, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: {
              skills: {
                _id: skillId,
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
    // removeLocation: async (parent, args, context) => {
    //   if (context.user) {
    //     const location = await Company.findOneAndDelete({
    //       _id: args.locationId,
    //       locationCreator: context.user._id,
    //     });

    //     await Company.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $pull: { locations: location._id } }
    //     );
    //     return location;
    //   }
    //   throw new AuthenticationError("You need to be logged in");
    // },
    // removeEducation: async (parent, args, context) => {
    //   if (context.user) {
    //     const education = await User.findOneAndDelete({
    //       _id: args.educationId,
    //       educationCreator: context.user._id,
    //     });

    //     await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $pull: { educations: education._id } }
    //     );
    //     return education;
    //   }
    //   throw new AuthenticationError("You need to be logged in");
    // },
    // removeExperience: async (parent, { experienceId }, context) => {
    //   if (context.user) {
    //     const experience = await User.findOneAndDelete({
    //       _id: experienceId,
    //       experienceCreator: context.user._id,
    //     });

    //     await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $pull: { experiences: experience._id } }
    //     );
    //     return experience;
    //   }
    //   throw new AuthenticationError("You need to be logged in");
    // },
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
