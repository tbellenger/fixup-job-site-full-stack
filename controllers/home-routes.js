const router = require("express").Router();
const sequelize = require("../config/connection");
const { Category, Job } = require("../models");

// get all categories for homepage

router.get("/", async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    const categories = allCategories.map((category) =>
      category.get({ plain: true })
    );

    res.render("homepage", {
      categories: categories,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/category/:id/jobs", async (req, res) => {
  try {
    const allJobs = await Job.findAll({
      where: {
        category_id: req.params.id,
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    const jobs = allJobs.map((job) => job.get({ plain: true }));

    res.render("category", {
      jobs: jobs,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
