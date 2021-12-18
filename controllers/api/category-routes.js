const router = require("express").Router();
const { Category } = require("../../models");

// get all users
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

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

module.exports = router;
