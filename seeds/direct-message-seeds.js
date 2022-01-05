//require the direct message models
const { DirectMessage } = require("../models");
//declare the direct message keys and values
const dmdata = [
  {
    message: "DM1",
    to_id: 2,
    from_id: 1,
    message_parties: "1-2",
  },
  {
    message: "DM2",
    to_id: 1,
    from_id: 2,
    message_parties: "1-2",
  },
  {
    message: "DM3",
    to_id: 2,
    from_id: 1,
    message_parties: "1-2",
  },
  {
    message: "DM4",
    to_id: 1,
    from_id: 2,
    message_parties: "1-2",
  },
  {
    message: "DM5",
    to_id: 2,
    from_id: 1,
    message_parties: "1-2",
  },
];
//seed all the direct messages
const seedDirectMessages = () => DirectMessage.bulkCreate(dmdata);
//then export the seeded direct messages data
module.exports = seedDirectMessages;
