const router = require("express").Router();
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

router.get("/", async (req, res) => {
  try {
    res.setHeader("Content-Type", "image/png");
    const buffer = identicon.generateSync({ id: 999999, size: 40 });
    res.end(buffer);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
