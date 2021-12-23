const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
require("dotenv").config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const uploadFile = (fileName) => {
  // This assumes that the file has been uploaded and temporarily
  // saved to the disk in Heroku because it includes readFileSync
  // However this could just as easily be data uploaded to the server
  // but not saved. fileContent is just a Buffer. That could be a buffer with
  // data received from the client
  // Read content from the file
  const fileContent = fs.readFileSync(fileName);

  // Setting up S3 upload parameters
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: "jobimage.jpg", // File name you want to save as in S3
    Body: fileContent,
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

uploadFile(path.join(__dirname, "resources/static/assets/uploads"));
