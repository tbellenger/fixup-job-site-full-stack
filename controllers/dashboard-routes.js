//require the express routes package
const router = require("express").Router();
const getDmParties = require("../utils/dm-helper");
//require the sequelize connection
const sequelize = require("../config/connection");
//require all models assocaited with each other

const {
  Job,
  User,
  Comment,
  Category,
  Ratings,
  JobApplicant,
  JobTag,
  Jobimage,
  DirectMessage,
} = require("../models");

//get all jobs data
router.get("/", async (req, res) => {
  try {
    const allJobs = await Job.findAll({
      where: {
        owner_id: req.user.id,
      },
      attributes: { exclude: ["updatedAt"] },
      //include the models that are related to the job model
      include: [
        { model: User, as: "owner", attributes: { exclude: ["password"] } },
        { model: User, as: "employee", attributes: { exclude: ["password"] } },
        { model: User, as: "applicant", attributes: { exclude: ["password"] } },
        { model: Jobimage },
        { model: Category },
        {
          model: Comment,
          attributes: ["id", "comment_text", "job_id", "user_id"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    const allCategories = await Category.findAll();
    const categories = allCategories.map((category) =>
      category.get({ plain: true })
    );

    const allAppliedJobs = await Job.findAll({
      include: [
        { model: User, as: "owner" },
        {
          model: User,
          as: "applicant",
          where: {
            id: req.user.id,
          },
        },
      ],
    });
    let appliedJobs = [];
    if (allAppliedJobs) {
      appliedJobs = allAppliedJobs.map((app) => app.get({ plain: true }));
    }

    const allSelectedJobs = await Job.findAll({
      include: [
        { model: User, as: "owner" },
        {
          model: User,
          as: "employee",
          where: {
            id: req.user.id,
          },
        },
      ],
    });
    let selectedJobs = [];
    if (allSelectedJobs) {
      selectedJobs = allSelectedJobs.map((app) => app.get({ plain: true }));
    }

    const jobs = allJobs.map((job) => job.get({ plain: true }));
    console.log(jobs);
    res.render("dashboard", {
      jobs: jobs,
      categories: categories, // used to render the new job form category choices
      applied: appliedJobs,
      selected: selectedJobs,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//get the job data by id to edit
router.get("/job/:id/edit", async (req, res) => {
  try {
    const dbJob = await Job.findOne({
      where: {
        owner_id: req.user.id, // make sure this is the owner of the job
        id: req.params.id,
      },
      attributes: { exclude: ["updatedAt"] },
      include: [
        { model: User, as: "owner", attributes: { exclude: ["password"] } },
        { model: User, as: "employee", attributes: { exclude: ["password"] } },
        { model: User, as: "applicant", attributes: { exclude: ["password"] } },
        { model: Category },
        { model: Jobimage },
        {
          model: Comment,
          attributes: ["id", "comment_text", "job_id", "user_id"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    if (!dbJob) {
      // no job posting from this user with that job id found
      return res
        .status(404)
        .json({ message: "No job posting from this user with that job id" });
    }

    const allCategories = await Category.findAll();
    const categories = allCategories.map((category) =>
      category.get({ plain: true })
    );

    const job = dbJob.get({ plain: true });
    console.log(job);
    res.render("edit-job", {
      job: job,
      categories: categories, // used to render the new job form category choices
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/job/:id/applicants", async (req, res) => {
  try {
    const dbJob = await Job.findOne({
      where: {
        owner_id: req.user.id, // make sure this is the owner of the job
        id: req.params.id,
      },
      attributes: { exclude: ["updatedAt"] },
      include: [
        { model: User, as: "owner", attributes: { exclude: ["password"] } },
        { model: User, as: "employee", attributes: { exclude: ["password"] } },
        { model: User, as: "applicant", attributes: { exclude: ["password"] } },
        { model: Jobimage },
      ],
    });

    if (!dbJob) {
      // no job posting from this user with that job id found
      return res
        .status(404)
        .json({ message: "No job posting from this user with that job id" });
    }

    const job = dbJob.get({ plain: true });
    console.log(job);
    res.render("applicants", {
      job: job,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get the job data by id
router.get("/job/:id", async (req, res) => {
  try {
    const dbJob = await Job.findOne({
      where: {
        id: req.params.id,
      },
      attributes: { exclude: ["updatedAt"] },
      include: [
        { model: User, as: "owner", attributes: { exclude: ["password"] } },
        { model: User, as: "employee", attributes: { exclude: ["password"] } },
        { model: User, as: "applicant", attributes: { exclude: ["password"] } },
        { model: Category },
        { model: Jobimage },
        {
          model: Comment,
          attributes: ["id", "comment_text", "job_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["id", "username"],
          },
        },
      ],
    });

    if (!dbJob) {
      // no job posting with that job id found
      return res
        .status(404)
        .json({ message: "No job posting with that job id" });
    }

    const job = dbJob.get({ plain: true });
    for (let i = 0; i < job.comments.length; i++) {
      if (job.comments[i].user_id == req.user.id) {
        console.log("setting comment to editable");
        job.comments[i].isEditable = true;
      }
    }
    console.log(job);

    res.render("job", {
      job: job,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//get the user data by id
router.get("/user/:id", async (req, res) => {
  try {
    const sameUser = parseInt(req.params.id) === req.user.id;
    exclude = ["password"];
    if (!sameUser) {
      exclude.push("email");
      exclude.push("last_login");
    }
    const dbUser = await User.findOne({
      where: {
        id: req.params.id,
      },
      attributes: { exclude: exclude },
      include: [
        {
          model: Ratings,
          as: "user_ratings",
          attributes: ["id", "user_id", "rating"],
        },
      ],
    });

    const parties = getDmParties(req.user.id, req.params.id);

    const dbDirectMessages = await DirectMessage.findAll({
      where: {
        parties: parties,
      },
    });

    const dmArray = dbDirectMessages.map((dm) => dm.get({ plain: true }));

    if (!dbUser) {
      res.status(404).json({ message: "No user with that ID" });
      return;
    } else {
      const user = dbUser.get({ plain: true });
      let userAverage = 0;
      let userAverage1 = 0;
      const total1 = [];
      for (let i = 0; i < user.user_ratings.length; i++) {
        // console.log("this is the lenght" + user.user_ratings.length);
        // console.log(user.user_ratings[i].rating);

        total1.push(user.user_ratings[i].rating);
        // console.log(total1);
        const avg = (arr) => {
          const sum = arr.reduce((acc, cur) => acc + cur);
          const average = sum / arr.length;
          // console.log(average);
          return average;
        };
        userAverage = avg(total1).toFixed(1);
        // console.log(userAverage);
      }
      function roundHalf(num) {
        return Math.round(num * 2) / 2;
      }
      userAverage1 = roundHalf(userAverage);
      // console.log(userAverage1);
      user.directmessages = dmArray;
      return res.render("user", {
        user: user,
        sameUser: sameUser,
        userAverage: userAverage1,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//export the job routes
module.exports = router;
