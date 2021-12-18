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
// const Ratings = require("./UserRatings");

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
  through: "Job_Applicant",
});
User.belongsToMany(Job, {
  as: "applicant",
  through: "Job_Applicant",
});

Job.belongsToMany(User, {
  through: "Jobs_Completed",
});
User.belongsToMany(Job, {
  through: "Jobs_Completed",
});

Job.belongsToMany(User, {
  through: "Jobs_Offered",
});
User.belongsToMany(Job, {
  through: "Jobs_Offered",
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

// User.hasMany(User, {
//   through: Ratings,
//   as: "user_ratings",
//   foreignKey: "user_id",
//   onDelete: "SET NULL",
// });
// User.belongsToMany(User, {
//   through: Ratings,
//   as: "user_ratings",
//   foreignKey: "user_id",
//   onDelete: "SET NULL",
// });

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
  through: JobLocation,
  as: "joblocation",
  foreignKey: "location_id",
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
  // Ratings,
};
