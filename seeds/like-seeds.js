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
//call the bulk of seed like
const seedLike = () => Like.bulkCreate(likedata);
//export the seed like
module.exports = seedLike;
