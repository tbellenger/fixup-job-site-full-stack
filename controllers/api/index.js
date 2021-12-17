const router = require("express").Router();

const userRoutes = require("./user-routes");
const categoryRoutes = require("./category-routes");
const jobRoutes = require("./job-routes");
const commentRoutes = require("./comment-routes");

router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);
router.use("/jobs", jobRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
