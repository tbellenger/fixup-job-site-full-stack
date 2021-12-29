//require the express routes package
const router = require("express").Router();
//require the comment model
const { DM } = require("../../models");

// get all threads
router.get("/", async (req, res) => {
  try {
    const dms = await DM.findAll();
    res.json(dms);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get the thread by id
router.get("/:id", async (req, res) => {
  try {
    const dm = DM.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!dm) {
      res.status(404).json({ message: "No thread with that ID" });
      return;
    } else {
      res.json(dm);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get the new thread post
router.post("/", async (req, res) => {
  try {
    console.log(req.body.dm_text);
    console.log(req.user.id);
    console.log(req.body.recepient_id);

    const dm = await DM.create({
      dm_text: req.body.dm_text,
      sender_id: req.user.id,
      recepient_id: req.body.recepient_id,
    });
    res.json(dm);
  } catch (err) {
    console.log(err.errors);
    res.status(500).json(err);
  }
});

//get the thread by id to edit
router.put("/:id", async (req, res) => {
  try {
    const dm = await DM.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!dm) {
      res.status(404).json({ message: "No thread with that ID" });
      return;
    } else {
      res.json(dm);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// get thread by id to delete
router.delete("/:id", async (req, res) => {
  try {
    const dm = await DM.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!dm) {
      res.status(404).json({ message: "No thread with that ID" });
      return;
    } else {
      res.json(dm);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//export the DM routes
module.exports = router;
