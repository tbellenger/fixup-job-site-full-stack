//require the express routes package
const router = require("express").Router();
//require the comment model
const { DirectMessage } = require("../../models");

// get all comments
router.post("/", async (req, res) => {
  try {
    const dm = await DirectMessage.create(req.body);

    res.json(dm);
  } catch (err) {
    res.status(500).json(err);
  }
});
