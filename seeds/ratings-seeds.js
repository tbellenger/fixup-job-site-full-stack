//require the ratings models
const { Ratings } = require("../models");
//declare the ratings keys and values
const ratingsdata = [
  {
    user_id: 1,
    rating: 1,
  },
  {
    user_id: 2,
    rating: 2,
  },
  {
    user_id: 3,
    rating: 4.2,
  },
  {
    user_id: 4,
    rating: 2,
  },
  {
    user_id: 4,
    rating: 4,
  },
  {
    user_id: 4,
    rating: 5,
  },
];
//seed all ratings data
const seedRatings = () => Ratings.bulkCreate(ratingsdata);
//exports the ratings data
module.exports = seedRatings;
