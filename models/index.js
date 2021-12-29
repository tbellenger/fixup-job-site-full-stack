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
const DM = require("./Dm")
const sequelize = require("../config/connection");
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

Job.hasMany(Jobimage, {
  foreignKey: "job_id",
  onDelete: "cascade",
});
Jobimage.belongsTo(Job, {
  foreignKey: "job_id",
  onDelete: "cascade",
});
DM.belongsTo(User, {
  foreignKey: "sender_id",
});
User.hasMany(DM, {
  foreignKey: "recepient_id",
})

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
  DM,
};
