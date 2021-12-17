const { Category } = require("../models");

const categorydata = [
  {
    category_name: "Yard work",
  },
  {
    category_name: "Painting",
  },
  {
    category_name: "Handyman",
  },
  {
    category_name: "Electrical",
  },
  {
    category_name: "Cleanup",
  },
  {
    category_name: "Plumbing",
  },
];

const seedCategory = () => Category.bulkCreate(categorydata);

module.exports = seedCategory;
