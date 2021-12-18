const router = require("express").Router();
const sequelize = require("../config/connection");
const { Category } = require("../models");

// get all categories for homepage

router.get("/", async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    const categories = allCategories.map((category) =>
      category.get({ plain: true })
    );
    console.log(categories);
    res.render("homepage"),
      {
        cats: categories,
      };
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
