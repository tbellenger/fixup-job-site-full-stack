//module helpers to parse direct message
module.exports = {
  getDmParties: (ida, idb) => {
    return parseInt(ida) > parseInt(idb) ? idb + "-" + ida : ida + "-" + idb;
  },
};
