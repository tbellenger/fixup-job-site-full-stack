//require the job location models
const { JobLocation } = require("../models");
//declare the job location key and value
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
//seed all job location data
const seedJobLocation = () => JobLocation.bulkCreate(JobLocationData);
//then export the seeded job location data
module.exports = seedJobLocation;
