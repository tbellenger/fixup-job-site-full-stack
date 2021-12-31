//require the express routes package
const router = require("express").Router();
const dmHelper = require("../../utils/dm-helper");
//require the directmessage model
const { DirectMessage } = require("../../models");

// get all comments
router.post("/", async (req, res) => {
  try {
    const message_parties = dmHelper.getDmParties(req.user.id, req.body.to_id);
    req.body.message_parties = message_parties;
    req.body.from_id = req.user.id;

    const dm = await DirectMessage.create(req.body);

    res.json(dm);
  } catch (err) {
    res.status(500).json(err);
  }
});

//export the dm routes
module.exports = router;
