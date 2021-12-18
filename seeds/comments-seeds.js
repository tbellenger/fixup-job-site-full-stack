const { Comment } = require("../models");

const commentdata = [
  {
    comment_text: "great employer",
    user_id: 2,
    job_id: 1,
  },
  {
    comment_text: "terrible experience",
    user_id: 1,
    job_id: 3,
  },
  {
    comment_text: "what time is good for you",
    user_id: 4,
    job_id: 2,
  },
  {
    comment_text: "do i bring my own tools",
    user_id: 3,
    job_id: 4,
  },
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;
