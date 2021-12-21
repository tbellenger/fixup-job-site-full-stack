//require the express routes package
const router = require("express").Router();
//require the passport package
const passport = require("passport");
//require the authentication token
const jwt = require("jsonwebtoken");
//require the User model
const { User } = require("../../models");

// no route to get all users on purpose

router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const users = await User.findOne({
        attributes: { exclude: ["password"] },
        where: {
          id: req.user.id,
        },
      });
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
//get user by id to authentication process
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      exclude = ["password"];
      if (req.params.id !== req.user.id) {
        exclude.push("email");
        exclude.push("last_login");
      }
      const user = User.findOne({
        attributes: { exclude: exclude },
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
  }
);

router.post(
  "/",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "Signup successful",
      user: req.user,
    });
  }
);
//get the user data from a login session
router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        console.log(err);
        console.log(user);
        console.log(info);
        const error = new Error("An error occurred");
        return next(error);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const token = sign(user);
        console.log(token);
        return res.json({ token });
      });
    } catch (err) {
      return next(error);
    }
  })(req, res, next);
});
//get the new user data and assign token and session timeout
function sign(user) {
  console.log("signing token");
  const body = { id: user.id, email: user.email, username: user.username};
  const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  return token;
}
//assign token by id 
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.params.id !== req.user.id) {
      res.status(401).json({ message: "Update to other users not allowed" });
      return;
    }
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
  }
);
//delete user by id
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.params.id !== req.user.id) {
      res.status(401).json({ message: "Deleting other users not allowed" });
      return;
    }
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
  }
);
//export the token routes 
module.exports = router;
