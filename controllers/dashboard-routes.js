//require the express routes package
const router = require("express").Router();
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
    const jobs = allJobs.map((job) => job.get({ plain: true }));
    console.log(jobs);
    res.render("dashboard", {
      jobs: jobs,
      categories: categories, // used to render the new job form category choices
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
        {
          model: Comment,
          attributes: ["id", "comment_text", "job_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["username"],
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
    if (!dbUser) {
      res.status(404).json({ message: "No user with that ID" });
      return;
    } else {
      const user = dbUser.get({ plain: true });
      console.log(
        "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$" +
          typeof user.user_ratings +
          user.user_ratings["rating"]
      );
      // const ratingarr = Object.values(dbUser.user_ratings);
      // const ratingarr = Object.keys(user.user_ratings).map((rating) => [
      //   Number(rating),
      //   user.user_ratings[rating],
      // ]);
      // const pick = (obj, arr) =>
      //   arr.reduce(
      //     (acc, record) => (record in obj && (acc[record] = obj[record]), acc),
      //     {}
      //   );
      // const result = pick(user.user_ratings, ["x", "rating"]);
      // console.log(result);
      const myData = [user.user_ratings];

      const keys = ["rating"];

      const result = myData.reduce((r, e, i, a) => {
        keys.forEach((k) => (r[k] = (r[k] || 0) + parseInt(e[k])));
        if (!a[i + 1])
          Object.keys(e)
            .filter((k) => typeof e[k] == "string")
            .forEach((k) => (r[k] /= myData.length));
        return r;
      }, {});

      console.log(result);
      // console.log("this is the array " + ratingarr + "id " + user.id);
      return res.render("user", {
        user: user,
        sameUser: sameUser,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//export the job routes
module.exports = router;
