// import all models
const Job = require("./Job");
const User = require("./User");
const Like = require("./Like");
const Comment = require("./Comment");
const Category = require("./Category");
const Tag = require("./Tag");
const JobTag = require("./JobTag");
const Ratings = require("./UserRatings");
const Jobimage = require("./Jobimage");
const sequelize = require("../config/connection");
const DirectMessage = require("./DirectMessage");
const JobApplicant = sequelize.define("Job_Applicant");

// create associations
User.hasMany(Job, {
  as: "owner",
  foreignKey: "owner_id",
});
Job.belongsTo(User, {
  as: "owner",
  foreignKey: "owner_id",
  onDelete: "SET NULL",
});

User.hasMany(Job, {
  as: "employee",
  foreignKey: "employee_id",
});
Job.belongsTo(User, {
  as: "employee",
  foreignKey: "employee_id",
  onDelete: "SET NULL",
});

Job.belongsToMany(User, {
  as: "applicant",
  through: JobApplicant,
});
User.belongsToMany(Job, {
  as: "applicant",
  through: JobApplicant,
});

User.belongsToMany(Job, {
  through: Like,
  as: "likes_count",
  foreignKey: "user_id",
});
Job.belongsToMany(User, {
  through: Like,
  as: "likes_count",
  foreignKey: "job_id",
});

User.hasMany(Ratings, {
  // through: Ratings,
  as: "user_ratings",
  foreignKey: "user_id",
  onDelete: "SET NULL",
});
Ratings.belongsTo(User);
// {
// through: Ratings,
// as: "user_ratings",
// foreignKey: "ratings_id",
// onDelete: "SET NULL",
// });

Like.belongsTo(User, {
  foreignKey: "user_id",
});
User.hasMany(Like, {
  foreignKey: "user_id",
});

Like.belongsTo(Job, {
  foreignKey: "job_id",
});
Job.hasMany(Like, {
  foreignKey: "job_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Comment.belongsTo(Job, {
  foreignKey: "job_id",
  onDelete: "SET NULL",
});
Job.hasMany(Comment, {
  foreignKey: "job_id",
});

Category.hasMany(Job, {
  foreignKey: "category_id",
  onDelete: "SET NULL",
});
Job.belongsTo(Category, {
  foreignKey: "category_id",
});

Job.belongsToMany(Tag, {
  through: JobTag,
  as: "jobtag",
  foreignKey: "job_id",
});
Tag.belongsToMany(Job, {
  through: JobTag,
  as: "jobtag",
  foreignKey: "tag_id",
});

Job.hasMany(Jobimage, {
  foreignKey: "job_id",
  onDelete: "cascade",
});
Jobimage.belongsTo(Job, {
  foreignKey: "job_id",
  onDelete: "cascade",
});

DirectMessage.belongsTo(User, {
  as: "from",
  foreignKey: "from_id",
  onDelete: "cascade",
});
User.hasMany(DirectMessage, {
  as: "from",
  foreignKey: "from_id",
  onDelete: "cascade",
});

DirectMessage.belongsTo(User, {
  as: "to",
  foreignKey: "to_id",
  onDelete: "cascade",
});
User.hasMany(DirectMessage, {
  as: "to",
  foreignKey: "to_id",
  onDelete: "cascade",
});

//exports all the models
module.exports = {
  User,
  Job,
  Like,
  Comment,
  Category,
  Tag,
  JobTag,
  Ratings,
  Jobimage,
  JobApplicant,
  DirectMessage,
};
