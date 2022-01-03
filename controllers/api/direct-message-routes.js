//require the express routes package
const router = require("express").Router();
const dmHelper = require("../../utils/dm-helper");
//require the directmessage model
const { DirectMessage } = require("../../models");

// get all direct messages
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

//delete message by id
router.delete("/:id", async (req, res) => {
  try {
      const deletedm = await DirectMessage.destroy({
          where: {
              id: req.params.id,
          },
      });
      return res.status(200).json(deletedm);
  } catch (err) {
      console.log(err);
      return res.status(500).json(err);
  }
});


//export the dm routes
module.exports = router;
