//require the comment models
const { DM } = require("../models");
//declare the dm keys and values
const dmdata = [
  {
    dm_text: "hi, I wan to know the job details",
    sender_id: 2,
    recepient_id: 1,
  },
  {
    dm_text: "Is the position still available?",
    sender_id: 1,
    recepient_id: 3,
  },
  {
    dm_text: "What are the qualification?",
    sender_id: 4,
    recepient_id: 2,
  },
  {
    dm_text: "Where are you loacted at?",
    sender_id: 3,
    recepient_id: 4,
  },
];
//seed all the dms 
const seedDms = () => DM.bulkCreate(dmdata);
//then export the seeded comments data
module.exports = seedDms;