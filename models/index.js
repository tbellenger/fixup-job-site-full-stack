// import all models
const Job = require("./Job");
const User = require("./User");
const Like = require("./Like");
const Comment = require("./Comment");
const Category = require("./Category");
const Tag = require("./Tag");
const JobTag = require("./JobTag");
const Location = require("./Location");
const JobLocation = require("./JobLocation");

// create associations
User.hasMany(Job, {
  foreignKey: "owner_id",
});

Job.belongsTo(User, {
  foreignKey: "owner_id",
  onDelete: "SET NULL",
});

User.hasMany(Job, {
  foreignKey: "applicant_id",
});

Job.belongsTo(User, {
  foreignKey: "applicant_id",
  onDelete: "SET NULL",
});

User.belongsToMany(Job, {
  through: Like,
  as: "likes_count",
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Job.belongsToMany(User, {
  through: Like,
  as: "likes_count",
  foreignKey: "job_id",
  onDelete: "SET NULL",
});

Like.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Like.belongsTo(Job, {
  foreignKey: "job_id",
  onDelete: "SET NULL",
});

User.hasMany(Like, {
  foreignKey: "user_id",
});

Job.hasMany(Like, {
  foreignKey: "job_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Comment.belongsTo(Job, {
  foreignKey: "job_id",
  onDelete: "SET NULL",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
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
Job.hasOne(Location, {
  through: JobLocation,
  as: "joblocation",
  foreignKey: "job_id",
});

Location.belongsToMany(Job, {
  through: JobLocation,
  as: "joblocation",
  foreignKey: "location_id",
});

module.exports = {
  User,
  Job,
  Like,
  Comment,
  Category,
  Tag,
  JobTag,
  Location,
  JobLocation,
};
