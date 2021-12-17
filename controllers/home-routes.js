const router = require("express").Router();
const sequelize = require("../config/connection");
const { Job, User, Comment, Category } = require("../models");

// get all categories for homepage
router.get("/", (req, res) => {
  try {
    const categories = await Category.findAll();
    const displayCat = categories.map((job) => job.get({ plain: true }));

    res.render("homepage", {
      displayCat,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
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
  console.log("==========Login========");
  if (req.session.loggedIn) {
    console.log("==========Login Redirect========");
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
