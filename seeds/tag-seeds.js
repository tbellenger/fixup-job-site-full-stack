//require the Tag models
const { Tag } = require("../models");
//set the Tag models key and value
const tagdata = [
  {
    tag_name: "outdoor work",
  },
  {
    tag_name: "heavy lifting",
  },
  {
    tag_name: "easy job",
  },
  {
    tag_name: "quick job",
  },
  {
    tag_name: "high payout",
  },
  {
    tag_name: "skills required",
  },
];
//seed the tag all together
const seedTag = () => Tag.bulkCreate(tagdata);
//exports the tag information
module.exports = seedTag;
