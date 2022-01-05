//require the node mailer package and dotenv to handle sensitive information
const nodemailer = require("nodemailer");
require("dotenv").config();
//create transport mailer handler
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fixup.app.job@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});
//email body content
const mailOptions = {
  from: "fixup.app.job@gmail.com",
  subject: "Congratulations",
  text: "Congratulations - your job application on fixup-job.herokuapp.com was successful. Check the site for details",
  html: "<h2>Congratulations</h2><p>Your job application on <a href='https://fixup-job.herokuapp.com'>fixUp</a> was successful. Go check your dashboard for more info. <p>The fixUp team",
};
//create function to send and accept the emails
function emailApplicationSuccess(destinationEmail) {
  mailOptions.to = destinationEmail;
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
//export the email application success
module.exports = { emailApplicationSuccess };
