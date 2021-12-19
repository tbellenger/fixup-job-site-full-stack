const router = require("express").Router();
const sequelize = require("../config/connection");
const { Job, User, Comment, Category } = require("../models");

router.get("/", async (req, res) => {
  try {
    const allJobs = await Job.findAll({
      where: {
        owner_id: req.user.id,
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
    const jobs = allJobs.map((job) => job.get({ plain: true }));
    console.log(jobs);
    res.render("dashboard", {
      jobs: jobs,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
