//require the express routes package
const router = require("express").Router();
//require the identicon path
const identicon = require("identicon");

// avatar/:id will serve a unique avatar image
router.get("/:id", async (req, res) => {
  try {
    res.setHeader("Content-Type", "image/png");
    const buffer = identicon.generateSync({ id: req.params.id, size: 40 });
    res.end(buffer);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get the file path to generate unique avatar
router.get("/", async (req, res) => {
  try {
    res.setHeader("Content-Type", "image/png");
    const buffer = identicon.generateSync({ id: "999999", size: 40 });
    res.end(buffer);
  } catch (err) {
    res.status(500).json(err);
  }
});
//export the avatar routes
module.exports = router;
