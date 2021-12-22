//require the express routes package
const router = require("express").Router();
const passport = require("passport");
//require all file routes
const userRoutes = require("./user-routes");
const categoryRoutes = require("./category-routes");
const jobRoutes = require("./job-routes");
const commentRoutes = require("./comment-routes");
//render all routes
router.use("/users", userRoutes);
// must have an account to see job postings
router.use("/categories", categoryRoutes);
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
//export all routes
module.exports = router;
