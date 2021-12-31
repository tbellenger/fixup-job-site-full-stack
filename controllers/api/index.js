//require the express routes package
const router = require("express").Router();
const passport = require("passport");
//require all file routes
const userRoutes = require("./user-routes");
const categoryRoutes = require("./category-routes");
const jobRoutes = require("./job-routes");
const commentRoutes = require("./comment-routes");
const ratingRoutes = require("./ratings-routes");
const directMessageRoutes = require("./direct-message-routes");
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
router.use(
  "/ratings",
  passport.authenticate("jwt", { session: false }),
  ratingRoutes
);
router.use(
  "/dm",
  passport.authenticate("jwt", { session: false }),
  directMessageRoutes
);
//export all routes
module.exports = router;
