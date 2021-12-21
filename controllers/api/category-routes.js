//require the express routes package
const router = require("express").Router();
const { Category } = require("../../models");

// get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get category by id
router.get("/:id", async (req, res) => {
  try {
    const category = Category.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!category) {
      res.status(404).json({ message: "No category with that ID" });
      return;
    } else {
      res.json(category);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//create new category
router.post("/", async (req, res) => {
  try {
    const category = await Category.create({
      category_name: req.body.category_name,
    });
    if (!category) {
      res.status(404).json({ message: "No category with that ID" });
      return;
    } else {
      res.json(category);
    }
  } catch (err) {
    console.log(err.errors);
    res.status(500).json(err);
  }
});
//get the category by id to delete
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!category) {
      res.status(404).json({ message: "No category with that ID" });
      return;
    } else {
      res.json(category);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//export the category routes
module.exports = router;
