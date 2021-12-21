//require the express routes package
const router = require("express").Router();
//require the sequelize connection
const sequelize = require("../config/connection");
//require all Models that associated with each other
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
//get the category by id from category data and job data
router.get("/category/:id/jobs", async (req, res) => {
  try {
    const allJobs = await Job.findAll({
      where: {
        category_id: req.params.id,
      },
      attributes: { exclude: ["updatedAt"] },
      //include all models that associated with category model
      include: [
        { model: User, as: "owner", attribute: { exclude: ["password"] } },
        { model: User, as: "employee", attribute: { exclude: ["password"] } },
        { model: Category },
      ],
    });
    //get the categories data and view it on the page
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
//get the job by id
router.get("/jobs/:id", async (req, res) => {
  try {
    const allJob = await Job.findOne({
      where: {
        id: req.params.id,
      },
      attributes: { exclude: ["updatedAt"] },
      //include the models related to the job model
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
//get all the jobs data
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
//get the login page 
router.get("/login", (req, res) => {
  res.render("login");
});
//exports the category routes
module.exports = router;
