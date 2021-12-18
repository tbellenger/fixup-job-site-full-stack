const { Ratings } = require("../models");

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

const seedRatings = () => Ratings.bulkCreate(ratingsdata);

module.exports = seedRatings;
