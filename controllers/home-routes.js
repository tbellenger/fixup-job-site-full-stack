const router = require("express").Router();
const sequelize = require("../config/connection");
const { Category } = require("../models");

// get all categories for homepage

router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll();
    const plainCats = categories.map((category) =>
      category.get({ plain: true })
    );
    res.render("homepage"),
      {
        plainCats,
      };
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
