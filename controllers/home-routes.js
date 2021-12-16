const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

// get all posts for homepage
router.get("/", (req, res) => {
  //   console.log("==========Home===========");
  //   Post.findAll({
  //     attributes: ["id", "post_contents", "title", "created_at"],
  //     include: [
  //       {
  //         model: Comment,
  //         attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
  //         include: {
  //           model: User,
  //           attributes: ["username"],
  //         },
  //       },
  //       {
  //         model: User,
  //         attributes: ["username"],
  //       },
  //     ],
  //   })
  //     .then((dbPostData) => {
  //       const posts = dbPostData.map((post) => post.get({ plain: true }));

  //       res.render("homepage", {
  //         posts: posts.reverse(),
  //         loggedIn: req.session.loggedIn,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json(err);
  //     });
  res.render("homepage", {
    loggedIn: req.session.loggedIn,
  });
});

// get single post
// router.get("/post/:id", (req, res) => {
//   Post.findOne({
//     where: {
//       id: req.params.id,
//     },
//     attributes: ["id", "post_contents", "title", "created_at"],
//     include: [
//       {
//         model: Comment,
//         attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
//         include: {
//           model: User,
//           attributes: ["username"],
//         },
//       },
//       {
//         model: User,
//         attributes: ["username"],
//       },
//     ],
//   })
//     .then((dbPostData) => {
//       if (!dbPostData) {
//         res.status(404).json({ message: "No post found with this id" });
//         return;
//       }

//       const post = dbPostData.get({ plain: true });

//       res.render("single-post", {
//         post,
//         loggedIn: req.session.loggedIn,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.get("/login", (req, res) => {
  console.log("==========Login========");
  if (req.session.loggedIn) {
    console.log("==========Login Redirect========");
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
