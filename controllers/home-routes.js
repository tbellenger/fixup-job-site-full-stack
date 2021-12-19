const router = require("express").Router();
const sequelize = require("../config/connection");
const { Category, Job, User } = require("../models");

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
      attributes: { exclude: ["updatedAt"] },
      include: [
        { model: User, as: "owner", attribute: { exclude: ["password"] } },
        { model: User, as: "employee", attribute: { exclude: ["password"] } },
        { model: Category },
      ],
    });
    const jobs = allJobs.map((job) => job.get({ plain: true }));
    console.log(jobs);
    res.render("category", {
      jobs: jobs,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/jobs/:id", async (req, res) => {
  try {
    const allJob = await Job.findOne({
      where: {
        id: req.params.id,
      },
      attributes: { exclude: ["updatedAt"] },
      include: [
        { model: User, as: "owner", attribute: { exclude: ["password"] } },
        { model: User, as: "employee", attribute: { exclude: ["password"] } },
        { model: Category },
      ],
    });
    const job = allJob.get({ plain: true });
    console.log(job);
    res.render("job", {
      job: job,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/jobs", async (req, res) => {
  try {
    const allJobs = await Job.findAll({
      attributes: { exclude: ["updatedAt"] },
      include: [
        { model: User, as: "owner", attribute: { exclude: ["password"] } },
        { model: User, as: "employee", attribute: { exclude: ["password"] } },
        { model: Category },
      ],
    });
    const jobs = allJobs.map((job) => job.get({ plain: true }));
    console.log(jobs);
    res.render("jobs", {
      jobs: jobs,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
