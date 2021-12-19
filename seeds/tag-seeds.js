const { Tag } = require("../models");

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

const seedTag = () => Tag.bulkCreate(tagdata);

module.exports = seedTag;
