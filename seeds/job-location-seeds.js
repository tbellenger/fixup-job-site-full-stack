const { JobLocation } = require("../models");

const JobLocationData = [
  {
    job_id: 1,
    location_id: 6,
  },
  {
    job_id: 2,
    location_id: 4,
  },
  {
    job_id: 3,
    location_id: 2,
  },
  {
    job_id: 4,
    location_id: 1,
  },
  {
    job_id: 5,
    location_id: 3,
  },
];

const seedJobLocation = () => JobLocation.bulkCreate(JobLocationData);

module.exports = seedJobLocation;
