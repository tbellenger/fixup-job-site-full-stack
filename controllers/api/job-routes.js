const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Job, User, Comment, Like, Category } = require("../../models");

// get all users
router.get("/", async (req, res) => {
  try {
    const job = await Job.findAll({
      attributes: [
        "id",
        "title",
        "description",
        "salary",
        "created_at",
        [
          sequelize.literal(
            "(SELECT COUNT(*) FROM vote WHERE job.id = vote.job_id)"
          ),
          "likes_count",
        ],
      ],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment_text", "job_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: Category,
          attributes: ["category_name"],
        },
      ],
    });
    res.json(job);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findOne({
      where: {
        id: req.params.id,
      },
      attributes: [
        "id",
        "title",
        "description",
        "salary",
        "created_at",
        [
          sequelize.literal(
            "(SELECT COUNT(*) FROM vote WHERE job.id = vote.job_id)"
          ),
          "likes_count",
        ],
      ],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment_text", "job_id", "user_id", "created_at"],
          include: {
            model: models.User,
            attributes: ["username"],
          },
        },
        {
          model: Category,
          attributes: ["category_name"],
        },
      ],
    });
    res.json(job);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const job = await Job.create({
      title: req.body.title,
      description: req.body.description,
      salary: req.body.salary,
    });
    if (!job) {
      res.status(404).json({ message: "No job with that ID" });
      return;
    } else {
      res.json(job);
    }
  } catch (err) {
    console.log(err.errors);
    res.status(500).json(err);
  }
});

// router.put("/like", async (req, res) => {
//   // custom static method created in models/Job.js
//   try {
//     const job = await Job.opinion(
//       { ...req.body, user_id: req.session.user_id },
//       { Like, Comment, User }
//     );
//     res.json(job);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.put("/:id", async (req, res) => {
  try {
    const job = await Job.update(
      {
        title: req.body.title,
        description: req.body.description,
        salary: req.body.salary,
        category_id: req.body.category_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!job) {
      res.status(404).json({ message: "No job with that ID" });
      return;
    } else {
      res.json(job);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const job = await Job.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!job) {
      res.status(404).json({ message: "No job with that ID" });
      return;
    } else {
      res.json(job);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
