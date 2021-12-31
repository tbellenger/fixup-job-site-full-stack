//require the express routes package
const router = require("express").Router();
const { Tag } = require("../../models");

// get all tags
router.get("/", async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get tag by id
router.get("/:id", async (req, res) => {
  try {
    const tag = await Tag.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!tag) {
      res.status(404).json({ message: "No tag with that ID" });
      return;
    } else {
      res.json(category);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//create new tag
router.post("/", async (req, res) => {
  try {
    const tag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    if (!tag) {
      res.status(404).json({ message: "No tag with that ID" });
      return;
    } else {
      res.json(tag);
    }
  } catch (err) {
    console.log(err.errors);
    res.status(500).json(err);
  }
});
//get the tag by id to delete
router.delete("/:id", async (req, res) => {
  try {
    const tag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tag) {
      res.status(404).json({ message: "No tag with that ID" });
      return;
    } else {
      res.json(tag);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//export the tag routes
module.exports = router;
