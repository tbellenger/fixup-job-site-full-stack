const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const path = require("path");

const exphbs = require("express-handlebars");

const helpers = require("./utils/helpers");
const hbs = exphbs.create({ helpers });

const session = require("express-session");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

require("./auth/auth");

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

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
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
=======
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
>>>>>>> 9e1b2aa9260402f1d36fe912e1fd0510f785640d
