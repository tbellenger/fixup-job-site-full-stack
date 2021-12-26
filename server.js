// require all the packages to generate the page
const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const path = require("path");
const exphbs = require("express-handlebars");
const fileUpload = require("express-fileupload");
// require the authentication token
require("./auth/auth");
// initiate the application that run by express
const app = express();
// declare the local port and third party port
const PORT = process.env.PORT || 3001;
// require the express packages that manage the UI
const helpers = require("./utils/helpers");
const hbs = exphbs.create({ helpers });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
// force heroku SSL
if (process.env.NODE_ENV && process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https") {
      res.redirect(`https://${req.header("host")}${req.url}`);
    } else {
      next();
    }
  });
}
//call back function to garner datas
app.use(
  fileUpload({
    limits: { fileSize: 3 * 1024 * 1024 }, // 3MB file size limit
    abortOnLimit: true,
    safeFileNames: true,
    preserveExtension: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// route image then generate the avatar
// and save the file and return it
// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
