//require the comment models
const { Comment } = require("../models");
//declare the comment keys and values
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
//seed all the comments 
const seedComments = () => Comment.bulkCreate(commentdata);
//then export the seeded comments data
module.exports = seedComments;
