const { Location } = require("../models");

const locationdata = [
  {
    zip_code: 11298,
  },
  {
    zip_code: 07306,
  },
  {
    zip_code: 94210,
  },
  {
    zip_code: 71631,
  },
  {
    zip_code: 35242,
  },
  {
    zip_code: 02127,
  },
];

const seedLocation = () => Location.bulkCreate(locationdata);

module.exports = seedLocation;
