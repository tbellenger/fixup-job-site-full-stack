//require the express routes package
const router = require("express").Router();
//require the comment model
const { Comment } = require("../../models");

// get all comments
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get the comment by id
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
//get the new comment post
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

//get the comment by id to edit
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
// get comment by id to delete
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
//export the Comment routes
module.exports = router;
