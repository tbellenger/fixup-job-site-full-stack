//require the like models
const { Like } = require("../models");
//declare the like keys and values
const likedata = [
  {
    user_id: 2,
    job_id: 1,
  },
  {
    user_id: 3,
    job_id: 1,
  },
  {
    user_id: 4,
    job_id: 1,
  },
  {
    user_id: 1,
    job_id: 3,
  },
];

const seedLike = () => Like.bulkCreate(likedata);

module.exports = seedLike;
