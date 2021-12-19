const router = require("express").Router();
const identicon = require("identicon");

router.get("/:id", async (req, res) => {
  try {
    res.setHeader("Content-Type", "image/png");
    const buffer = identicon.generateSync({ id: req.params.id, size: 40 });
    res.end(buffer);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
