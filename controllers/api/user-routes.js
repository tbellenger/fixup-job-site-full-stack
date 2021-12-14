const router = require("express").Router();
const { User } = require("../../models");

// get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = User.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.params.id,
      },
    });
    if (!user) {
      res.status(404).json({ message: "No user with that ID" });
      return;
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const exists = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (exists) {
      res.status(422).json({ message: "Username already exists" });
      return;
    }
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.user_id = user.id;
    req.session.username = user.username;
    req.session.loggedIn = true;
    req.session.save(() => {
      res.json({ user: user, message: "You are now logged in" });
    });
  } catch (err) {
    console.log(err.errors);
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!user) {
      res.status(404).json({ message: "No user with that ID" });
      return;
    } else {
      const validPassword = user.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(403).json({ message: "Access denied" });
        return;
      }
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;
      req.session.save(function (err) {
        res.json({ user: user, message: "You are now logged in!" });
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put("/:id", async (req, res) => {
  try {
    const user = await User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id,
      },
    });
    if (!user) {
      res.status(404).json({ message: "No user with that ID" });
      return;
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!user) {
      res.status(404).json({ message: "No user with that ID" });
      return;
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
