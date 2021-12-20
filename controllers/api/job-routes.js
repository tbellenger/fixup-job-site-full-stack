const router = require("express").Router();
const sequelize = require("../../config/connection");
const {
  Job,
  User,
  Comment,
  Like,
  Category,
  Location,
} = require("../../models");

// get all users
router.get("/", async (req, res) => {
  try {
    const job = await Job.findAll({
      attributes: [
        "id",
        "title",
        "description",
        "salary",
        "payment_method",
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
        {
          model: Location,
          attributes: ["zip_code"],
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
        "payment_method",
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
        {
          model: Location,
          attributes: ["zip_code"],
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
    const category = await Category.findOrCreate({
      where: {
        category_name: req.body.category_name,
      },
      defaults: {
        category_name: req.body.category_name,
      },
    });
    const job = await Job.create({
      title: req.body.title,
      description: req.body.description,
      salary: req.body.salary,
      payment_method: req.body.payment_method,
      zip_code: req.body.zip_code,
      category_name: req.body.category_name,
      category_id: category[0].id,
      owner_id: req.user.id,
    });
    const location = await Location.findOrCreate({
      where: {
        zip_code: req.body.zip_code,
      },
      defaults: {
        zip_code: req.body.zip_code,
      },
    });
    // console.log(
    //   "========================================================================" +
    //     Category.id
    // );
    if (!job || !location || !category) {
      res.status(404).json({ message: "No job with that ID" });
      return;
    } else {
      res.json(job);
      console.log(job);
      console.log(category);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/like", async (req, res) => {
  // custom static method created in models/Job.js
  try {
    const job = await Job.opinion(
      { ...req.body, user_id: req.session.user_id },
      { Like, Comment, User }
    );
    res.json(job);
  } catch (err) {
    res.status(500).json(err);
  }
});

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
