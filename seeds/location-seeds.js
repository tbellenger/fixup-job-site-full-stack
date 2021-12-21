//require the location models
const { Location } = require("../models");
//declare the location key and value
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
//seed all the location data
const seedLocation = () => Location.bulkCreate(locationdata);
//exports the location data
module.exports = seedLocation;
