const AWS = require("aws-sdk");
require("dotenv").config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
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

module.exports = {
  uploadFile,
};
