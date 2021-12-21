//require the tag related to the job models
const { JobTag } = require("../models");
//declare the job tag keys and values 
const jobTagData = [
  {
    job_id: 1,
    tag_id: 6,
  },
  {
    job_id: 1,
    tag_id: 2,
  },
  {
    job_id: 2,
    tag_id: 2,
  },
  {
    job_id: 3,
    tag_id: 4,
  },
  {
    job_id: 3,
    tag_id: 5,
  },
];
//seed all the tags together
const seedJobTags = () => JobTag.bulkCreate(jobTagData);
//then exports the tags data
module.exports = seedJobTags;
