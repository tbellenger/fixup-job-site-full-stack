//require the express routes package
const router = require("express").Router();
//require the sequelize connection
const sequelize = require("../config/connection");
//require all Models that associated with each other
const { Category, Job, User, Jobimage } = require("../models");
const { Op, literal } = require("sequelize");

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
    const category = await Category.findOne({
      where: {
        id: req.params.id,
      },
    });
    const allJobs = await Job.findAll({
      where: {
        category_id: req.params.id,
      },
      attributes: {
        exclude: ["updatedAt"],
        include: [
          literal("CONCAT(SUBSTRING(description,1,40),'...') as description"),
        ],
      },

      //include all models that associated with category model
      include: [
        { model: User, as: "owner", attribute: { exclude: ["password"] } },
        { model: User, as: "employee", attribute: { exclude: ["password"] } },
        { model: Jobimage },
        { model: Category },
      ],
    });
    //get the categories data and view it on the page
    const jobs = allJobs.map((job) => job.get({ plain: true }));
    console.log(jobs);
    res.render("jobs", {
      jobs: jobs,
      category: category.category_name + " Jobs",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get all the jobs data
router.get("/jobs", async (req, res) => {
  let category = "All Jobs";
  const queryOptions = {
    attributes: {
      exclude: ["updatedAt"],
      include: [
        literal("CONCAT(SUBSTRING(description,1,40),'...') as description"),
      ],
    },
    include: [
      { model: User, as: "owner", attribute: { exclude: ["password"] } },
      { model: User, as: "employee", attribute: { exclude: ["password"] } },
      { model: Category },
      { model: Jobimage },
    ],
  };
  console.log(req.query);
  if (req.query.q) {
    console.log(req.query.q);
    category = 'Search: "' + req.query.q + '"';
    // request includes search terms
    queryOptions.where = {
      [Op.or]: {
        title: {
          [Op.substring]: req.query.q,
        },
        description: {
          [Op.substring]: req.query.q,
        },
      },
    };
  }
  try {
    const allJobs = await Job.findAll(queryOptions);
    const jobs = allJobs.map((job) => job.get({ plain: true }));
    console.log(jobs);
    res.render("jobs", {
      jobs: jobs,
      category: category,
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
