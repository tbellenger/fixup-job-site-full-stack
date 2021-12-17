const router = require("express").Router();
const { Comment } = require("../../models");

// get all users
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const comment = Comment.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!comment) {
      res.status(404).json({ message: "No comment with that ID" });
      return;
    } else {
      res.json(comment);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const comment = await Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        job_id: req.body.job_id
    });
    res.json( comment);
  } catch (err) {
    console.log(err.errors);
    res.status(500).json(err);
  }
});


router.put("/:id", async (req, res) => {
  try {
    const comment = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!comment) {
      res.status(404).json({ message: "No comment with that ID" });
      return;
    } else {
      res.json(comment);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!comment) {
      res.status(404).json({ message: "No comment with that ID" });
      return;
    } else {
      res.json(comment);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
