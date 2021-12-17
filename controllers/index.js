const router = require("express").Router();
const passport = require("passport");

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
const dashboardRoutes = require("./dashboard-routes");

router.use("/", homeRoutes);
router.use(
  "/dashboard",
  passport.authenticate("jwt", { session: false }),
  dashboardRoutes
);
router.use("/api", apiRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
