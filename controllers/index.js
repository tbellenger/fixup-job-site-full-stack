//require the express packages
const router = require("express").Router();
const passport = require("passport");
//require all the ruotes associated with the application
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
const dashboardRoutes = require("./dashboard-routes");
const avatarRoutes = require("./avatar-routes");
//render all api routes
router.use("/", homeRoutes);
router.use(
  "/dashboard",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/login?msg=unauthorized", // handle expired token
  }),
  dashboardRoutes
);
router.use("/api", apiRoutes);
router.use("/avatar", avatarRoutes);

router.use((req, res) => {
  res.status(404).end();
});
//exports the router packages
module.exports = router;
