//require the express routes package
const router = require("express").Router();
//require the sequelize connection to manipulate all models
const sequelize = require("../../config/connection");
const aws = require("../../utils/aws-fileupload");
const sharp = require("sharp");

//require all associated models
const {
  Job,
  User,
  Comment,
  Like,
  Category,
  Jobimage,
  JobApplicant,
} = require("../../models");

// get all jobs
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
      order: [["created_at", "DESC"]],
      //include realted data assocaited with job model
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
          model: Jobimage,
          attributes: ["image_url"],
        },
      ],
    });
    res.json(job);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//get the job by id
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findOne({
      //find job post by id from database
      where: {
        id: req.params.id,
      },
      //se the job attributes
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
      //include all associated models
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
          model: Jobimage,
          attributes: ["image_url"],
        },
      ],
    });
    res.json(job);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get the new job post
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

    console.log(category[0]);
    console.log(category[1]);

    const job = await Job.create({
      title: req.body.title,
      description: req.body.description,
      salary: req.body.salary,
      payment_method: req.body.payment_method,
      zip_code: req.body.zip_code,
      category_id: category[0].id,
      owner_id: req.user.id,
    });
    if (!job || !category) {
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
//get image and set id for each post
router.post("/:id/image", async (req, res) => {
  try {
    const uniqueFilename =
      req.user.id + "-" + req.params.id + "-" + new Date().getTime();
    console.log("image upload route");
    // upload to s3
    const compressed = await sharp(req.files.file.data)
      .resize({ width: 400, withoutEnlargement: true })
      .webp()
      .withMetadata()
      .toBuffer();
    aws.uploadFile(uniqueFilename + ".webp", compressed);
    // create the DB entry associated with job id
    const jobimage = await Jobimage.create({
      job_id: req.params.id,
      image_url:
        "https://ucbstore.s3.us-west-1.amazonaws.com/" +
        encodeURIComponent(uniqueFilename + ".webp"),
    });
    if (!jobimage) {
      res.status(500).json({ message: "Server error" });
    }
    res.json(jobimage);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// handle application to a job
router.post("/:id/apply", async (req, res) => {
  try {
    // should check if the job is open for applications first

    // create a job applicant
    const application = await JobApplicant.findOrCreate({
      where: {
        jobId: parseInt(req.params.id),
        userId: req.user.id,
      },
      defaults: {
        jobId: parseInt(req.params.id),
        userId: req.user.id,
      },
    });

    res.json(application);
    console.log(application);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//capture the likes actions
router.put("/:id/like", async (req, res) => {
  // custom static method created in models/Job.js
  try {
    const like = await Like.findOrCreate({
      where: {
        job_id: parseInt(req.params.id),
        user_id: req.user.id,
      },
    });
    const job = await Job.findOne({
      where: {
        id: parseInt(req.params.id),
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
      //include all related data into job model
      include: [
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
    res.json(job);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// get the job by id to update
router.put("/:id", async (req, res) => {
  try {
    if (req.body.category_name) {
      const category = await Category.findOrCreate({
        where: {
          category_name: req.body.category_name,
        },
        defaults: {
          category_name: req.body.category_name,
        },
      });

      req.body.category_id = category[0].id;
      console.log(req.body.category_id);
    }
    const job = await Job.update(req.body, {
      where: {
        id: req.params.id,
        owner_id: req.user.id,
      },
    });
    //if no id exist return error
    if (!job) {
      res.status(404).json({ message: "No job with that ID" });
      return;
    } else {
      //return all job data
      if (req.body.employee_id) {
        // the employee id updated
        // send email
        const employee = await User.findOne({
          where: {
            id: req.body.employee_id,
          },
        });
        if (employee) {
          console.log(employee);
          console.log(employee.email);
          require("../../config/emailer").emailApplicationSuccess(
            employee.email
          );
        }
      }
      res.json(job);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//get the job by id to delete
router.delete("/:id", async (req, res) => {
  try {
    const job = await Job.destroy({
      where: {
        id: req.params.id,
        owner_id: req.user.id,
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
//export the job routes
module.exports = router;
