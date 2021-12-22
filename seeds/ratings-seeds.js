//require the ratings models
const { Ratings } = require("../models");
//declare the ratings keys and values
const ratingsdata = [
  {
    owner_id: 2,
    employee_id: 1,
  },
  {
    ownrer_id: 1,
    employee_id: 3,
  },
  {
    owner_id: 1,
    employee_id: 4,
  },
  {
    owner_id: 3,
    employee_id: 4,
  },
];
//seed all ratings data
const seedRatings = () => Ratings.bulkCreate(ratingsdata);
//exports the ratings data
module.exports = seedRatings;
