const router = require("express").Router();
const passport = require("passport");

const userRoutes = require("./user-routes");
const categoryRoutes = require("./category-routes");
const jobRoutes = require("./job-routes");
const commentRoutes = require("./comment-routes");
const locationRoutes = require("./location-routes");

router.use("/users", userRoutes);
// must have an account to see job postings
router.use("/categories", categoryRoutes);
router.use("/locations", locationRoutes);
router.use(
  "/jobs",
  passport.authenticate("jwt", { session: false }),
  jobRoutes
);
router.use(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  commentRoutes
);

module.exports = router;
