const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const path = require("path");

const exphbs = require("express-handlebars");

const helpers = require("./utils/helpers");
const hbs = exphbs.create({ helpers });

require("./auth/auth");

const app = express();
const PORT = process.env.PORT || 3001;

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// turn on routes
app.use(routes);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err });
});

// turn on connection to db and server
<<<<<<< HEAD
<<<<<<< HEAD
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
=======
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
>>>>>>> f3f927758848254e90d81a5b364e3b7ff65f9716
=======
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
>>>>>>> 3d383e4ae493592df93c500b61cdeb0fcce7bb89
