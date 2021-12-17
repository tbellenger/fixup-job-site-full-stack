// import all models
const Job = require("./Job");
const User = require("./User");
const Like = require("./Like");
const Comment = require("./Comment");
const Category = require("./Category");
const Tag = require("./Tag");
const JobTag = require("./JobTag");
const Location = require("./Location");

// create associations
User.hasMany(Job, {
  foreignKey: "owner_id",
});
Job.belongsTo(User, {
  foreignKey: "owner_id",
  onDelete: "SET NULL",
});

User.hasMany(Job, {
  foreignKey: "employee_id",
});
Job.belongsTo(User, {
  foreignKey: "employee_id",
  onDelete: "SET NULL",
});

Job.belongsToMany(User, {
  through: "Job_Applicant",
});
User.belongsToMany(Job, {
  through: "Job_Applicant",
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
User.hasMany(Like, {
  foreignKey: "user_id",
});

Like.belongsTo(Job, {
  foreignKey: "job_id",
  onDelete: "SET NULL",
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

Job.belongsToMany(Location, {
  foreignKey: "location_id",
});
Location.hasMany(Job, {
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
};
