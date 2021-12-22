//require the express routes package
const router = require("express").Router();
//require the sequelize connection to manipulate all models
const sequelize = require("../../config/connection");
const AWS = require("aws-sdk");
require("dotenv").config();

const {
  Job,
  User,
  Comment,
  Like,
  Category,
  Jobimage,
} = require("../../models");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

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

router.post("/:id/image", async (req, res) => {
  try {
    console.log("image upload route");
    // upload to s3
    uploadFile(req.files.file.name, req.files.file.data);
    // create the DB entry associated with job id
    const jobimage = await Jobimage.create({
      job_id: req.params.id,
      image_url:
        "https://ucbstore.s3.us-west-1.amazonaws.com/" +
        encodeURIComponent(req.files.file.name),
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

const uploadFile = (filename, data) => {
  // data received from the client
  // Setting up S3 upload parameters
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename, // File name you want to save as in S3
    Body: data,
    ContentType: "image/jpeg",
  };

  // Uploading files to the bucket
  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    // you would store this location in the database so that it can be included
    // in any requests to show the job. You would need a new table called image
    // and it should store the image_id, job_id, image_url
    // You would need to associate to jobs via the id
    // Jobs can have multiple images
    // Image can have one job
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};

//capture the likes actions
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
// get the job by id to update
router.put("/:id", async (req, res) => {
  try {
    const job = await Job.update(
      {
        title: req.body.title,
        description: req.body.description,
        salary: req.body.salary,
        category_id: req.body.category_id,
        zip_code: req.body.zip_code,
      },
      {
        where: {
          id: req.params.id,
          owner_id: req.user.id,
        },
      }
    );
    //if no id exist return error
    if (!job) {
      res.status(404).json({ message: "No job with that ID" });
      return;
    } else {
      //return all job data
      res.json(job);
    }
  } catch (err) {
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
